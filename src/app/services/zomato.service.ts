import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import { Coordinates } from '../models/Coordinates';

@Injectable({
  providedIn: 'root'
})
export class ZomatoService {
  constructor(
    private store: Store<{ coords: Coordinates }>,
    private http: HttpClient) { }
  url = 'https://developers.zomato.com/api/v2.1/';
  key = '3cfe188e3ef039a3cc20dad9038a2e7a';
  // coords$: Observable<Coordinates> = this.store.select(state => state.coords);

  getCuisines(coords$: Observable<Coordinates>) {
    let lat: Subscription = coords$.pipe(pluck('latitude')).subscribe(data => (data));
    let long: Subscription = coords$.pipe(pluck('longitude')).subscribe(data => (data));
    const cuisineURL: string = this.url + `cuisines?lat=${lat.toString()}&lon=${long.toString()}`;
    return this.http.get(cuisineURL, { headers: { 'user-key': this.key }}).pipe(
      map(res => (res.cuisines))
    );
  }

}
