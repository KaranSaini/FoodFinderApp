import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Coordinates } from '../models/Coordinates';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { tap, pluck, reduce, groupBy, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  coords: Coordinates = {
    latitude: undefined,
    longitude: undefined
  };
  location$ = this.store.select(state => state.location);

  constructor(private store: Store<{ location: Coordinates }>) { }

  callGeoLocationAPI() {
    if ('geolocation' in navigator) {
      const geo = navigator.geolocation;
      geo.getCurrentPosition((pos) => {
        this.getLocation(pos);
      });
    }
  }

  private getLocation(position) {
    let coordinates$: Observable<any> = new Observable((subscriber) => {
      subscriber.next(position.coords);
      subscriber.complete();
    });
    let obs1$ = coordinates$.pipe(
      pluck('latitude')
    );
    let obs2$ = coordinates$.pipe(
      pluck('longitude')
    );
    // Sets Latitude and Longin
    zip(obs1$, obs2$).pipe(
      map(([latitude, longitude]) => ({ latitude, longitude }))
    ).subscribe((data) => {
      console.log(data);
      this.store.dispatch({type: '[Location Service] Load Location', coordinate: data});
    });
  }
}
