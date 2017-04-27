/**
 * Created by ecobos on 27/04/2017.
 */
import {Geoposition} from "@ionic-native/geolocation";

export class CustomGeoposition implements Geoposition {
  public coords: Coordinates;
  public timestamp: number;
  public x;
  public y;


  constructor (geoposition: Geoposition){
    this.coords = geoposition.coords;
    this.timestamp = geoposition.timestamp;
    this.x = geoposition.coords.latitude;
    this.y = geoposition.coords.longitude;
  }

}
