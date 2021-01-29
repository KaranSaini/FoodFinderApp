import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import { Coordinates } from '../models/Coordinates';
import { Restaurant } from '../models/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class ZomatoService {
  private query: string;
  private radius: number;
  constructor(
    private store: Store<{ coords: Coordinates }>,
    private http: HttpClient) { }
  url = 'https://developers.zomato.com/api/v2.1/';
  key = '3cfe188e3ef039a3cc20dad9038a2e7a';
  coords$: Observable<Coordinates> = this.store.select(state => state.coords);

  getCuisines(coords$: Observable<Coordinates>) {
    const pluckedCoords = this.pluckCoordinates(coords$);
    const cuisineURL: string = this.url + `cuisines?lat=${pluckedCoords[0].toString()}&lon=${pluckedCoords[1].toString()}`;
    return this.http.get<any>(cuisineURL, { headers: { 'user-key': this.key }}).pipe(
      map(res => (res.cuisines))
    );
  }

  search(q: string, r: number, coords$: Observable<Coordinates>) {
    this.query = q;
    this.radius = r;
    const pluckedCoords = this.pluckCoordinates(coords$);
    const searchURL: string = this.url + `search?lat=${pluckedCoords[0].toString()}
                              &lon=${pluckedCoords[1].toString()}&radius=${r}&q=${q}&count=20&sort=rating`;
    const restaurants$ = this.http.get<any>(searchURL, { headers: { 'user-key': this.key } }).pipe(
      map(data => (data.restaurants))
    );
    restaurants$.subscribe(data => {
      this.store.dispatch({ type: '[Zomato Service] Restaurants Received', restaurants: data});
    });
    return restaurants$;
  }

  searchWithOffset(iteration: number) {
    const pluckedCoords = this.coords$;
    console.log(this.query, this.radius);
    const searchURL: string = this.url + `search?lat=${pluckedCoords[0].toString()}
    &lon=${pluckedCoords[1].toString()}&radius=${this.radius}&q=${this.query}&count=20&sort=rating`;
    // 1 : (20 - 40) 2 : (40 - 80) 3 : (80 - 100)
    switch (iteration) {
      case 1 :
        // 20
        let firstURL = searchURL + '&start=60';
        break;
      case 2 :
        // 40
        let secondURL = searchURL + '&start=60';
        break;
      case 3 :
        // 80
        let thirdURL = searchURL + '&start=80';
      default:
        console.log('offset cant go higher');
    }
  }

  pluckCoordinates(coords$: Observable<Coordinates>): Subscription[] {
    const lat: Subscription = coords$.pipe(pluck('latitude')).subscribe(data => (data));
    const long: Subscription = coords$.pipe(pluck('longitude')).subscribe(data => (data));
    return [lat, long];
  }
}
