import { Injectable, OnInit } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, throwError, Subscription, defer, of } from 'rxjs';
import { catchError, retry,  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ApiCommunicationService implements OnInit {
  private url: string = 'https://developers.zomato.com/api/v2.1/';
  private token: string = '3cfe188e3ef039a3cc20dad9038a2e7a';
  lat: number = 0;
  long: number = 0;
  coordinates: Subject<GeolocationPosition> = new Subject();


  constructor(private http: HttpClient) { }

  ngOnInit() {this.requestUserLocationInfo()}

   requestUserLocationInfo() {
    let geoObj: Geolocation = navigator.geolocation;
    geoObj.getCurrentPosition((pos) => {
      // this.setPositionForApp(pos);
      this.coordinates.next(pos);
    });
  }

  // setPositionForApp(position) {
  //   this.lat = position.coords.latitude;
  //   this.long = position.coords.longitude;
  // }

  getCuisines() {
    
  }
}
