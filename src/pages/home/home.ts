import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {GoogleMap, GoogleMapsEvent, LatLng} from "@ionic-native/google-maps";
import {Geoposition} from "@ionic-native/geolocation";
import {TrackingService} from "../../services/TrackingService";
declare var plugin: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  map: GoogleMap;
  previousPosition: Geoposition;

  constructor(public navCtrl: NavController, private trackingService: TrackingService) {

  }

  ngOnInit(){
    this.setMap();
    this.loadMap();
    this.trackingService.startTracking();
    this.trackingService.actualPosition.subscribe(position => {
      if(position!=null){
        this.drawRoute(position);
      }
    })
  }

  setMap(){
    let controls: any = {compass: true, myLocationButton: false, indoorPicker: false, zoom: true, mapTypeControl: false, streetViewControl: false};
    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': controls.compass,
        'myLocationButton': controls.myLocationButton,
        'indoorPicker': controls.indoorPicker,
        'zoom': controls.zoom,
        'mapTypeControl': controls.mapTypeControl,
        'streetViewControl': controls.streetViewControl
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      }
    });
  }

  loadMap(){
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
      (map) => {
        map.clear();
        map.off();
        map.setMapTypeId(plugin.google.maps.MapTypeId.HYBRID);
        map.setMyLocationEnabled(true);
      },(error)=>{
        console.error("Error:", error);
      }
    );
  }

  drawRoute(pos:Geoposition):void{
    if(this.previousPosition==null){
      this.previousPosition = pos;
    }
    this.map.addPolyline(
      {
        points: [new LatLng(this.previousPosition.coords.latitude, this.previousPosition.coords.longitude), new LatLng(pos.coords.latitude, pos.coords.longitude)],
        visible: true,
        color:'#FF0000',
        width:4
      }).then(
      (res)=>{
        this.previousPosition = pos;
      }
    ).catch(
      (err)=>{
        console.log("err: "+JSON.stringify(err));
      }
    );
  }

}
