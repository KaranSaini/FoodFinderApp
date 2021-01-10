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
    const pluckedCoords = this.pluckCoordinates(coords$);
    // let lat: Subscription = coords$.pipe(pluck('latitude')).subscribe(data => (data));
    // let long: Subscription = coords$.pipe(pluck('longitude')).subscribe(data => (data));
    const cuisineURL: string = this.url + `cuisines?lat=${pluckedCoords[0].toString()}&lon=${pluckedCoords[1].toString()}`;
    return this.http.get<any>(cuisineURL, { headers: { 'user-key': this.key }}).pipe(
      map(res => (res.cuisines))
    );
  }

  search(q: string, r: number, coords$: Observable<Coordinates>) {
    // let lat: Subscription = coords$.pipe(pluck('latitude')).subscribe(data => (data));
    // let long: Subscription = coords$.pipe(pluck('longitude')).subscribe(data => (data));
    const pluckedCoords = this.pluckCoordinates(coords$); 
    const searchURL: string = this.url + `search?lat=${pluckedCoords[0].toString()}&lon=${pluckedCoords[1].toString()}&radius=${r}&count=20`;
    return this.http.get<any>(searchURL, { headers: { 'user-key': this.key } });
  }

  pluckCoordinates(coords$: Observable<Coordinates>): Subscription[] {
    let lat: Subscription = coords$.pipe(pluck('latitude')).subscribe(data => (data));
    let long: Subscription = coords$.pipe(pluck('longitude')).subscribe(data => (data));
    return [lat, long];
  }
}
