import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import { Coordinates } from '../models/Coordinates';
import { Restaurant } from '../models/Restaurant';
import { createSelector } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ZomatoService {
  private query: string;
  private radius: number;
  constructor(
    public store: Store<{ location: Coordinates }>,
    private http: HttpClient) { }
  url = 'https://developers.zomato.com/api/v2.1/';
  key = '3cfe188e3ef039a3cc20dad9038a2e7a';
  coords$: Observable<Coordinates> = this.store.select('location');

  getCuisines(coords$: Observable<Coordinates>) {
    const pluckedCoords = this.pluckCoordinates(coords$);
    const cuisineURL: string = this.url + `cuisines?lat=${pluckedCoords[0].toString()}&lon=${pluckedCoords[1].toString()}`;
    return this.http.get<any>(cuisineURL, { headers: { 'user-key': this.key }}).pipe(
      map(res => (res.cuisines))
    );
  }

  async search(q: string, r: number, coords$: Observable<Coordinates>): Promise<boolean> {
    this.query = q;
    this.radius = r;
    const pluckedCoords = this.pluckCoordinates(coords$);
    const searchURL: string = this.url + `search?lat=${pluckedCoords[0].toString()}
                              &lon=${pluckedCoords[1].toString()}&radius=${r}&q=${q}&count=20&sort=rating`;
    const restaurants$ = this.http.get<any>(searchURL, { headers: { 'user-key': this.key } }).pipe(
      map(data => (data.restaurants))
    );
    restaurants$.subscribe(data => {
      this.store.dispatch({ type: '[Zomato Service] Restaurants Received', initialRestaurants: data});
    });

    // go get the rest of the results ahead of time ...
    const searchCheck = await this.getMoreResults(q, r);
    return searchCheck;
  }

  private async getMoreResults(q: string, r: number): Promise<boolean> {
    let i = 1;
    const pluckedCoords = this.pluckCoordinates(this.coords$);
    const searchURL: string = this.url + `search?lat=${pluckedCoords[0].toString()}
                              &lon=${pluckedCoords[1].toString()}&radius=${r}&q=${q}&count=20&sort=rating`;
    // is there some sort of series here? --- look into a better way to do this
    const valMap = {
      1 : '20',
      2 : '40',
      3 : '60',
      4 : '80'
    };
    while (i <= 4) {
      const offset = valMap[i++];
      const newURL = searchURL + `&start=${offset}`;
      console.log(newURL);
      const restaurants$ = this.http.get<any>(newURL, { headers: { 'user-key': this.key } }).pipe(
        map(data => (data.restaurants))
      );
      restaurants$.subscribe(data => {
        this.store.dispatch({ type: '[Zomato Service] More Restaurants Received', newRestaurants: data});
      }, (error) => {
        console.log(error);
        return false;
      });
    }
    return true;
  }

  pluckCoordinates(coords$: Observable<Coordinates>): Subscription[] {
    const lat: Subscription = coords$.pipe(pluck('latitude')).subscribe(data => (data));
    const long: Subscription = coords$.pipe(pluck('longitude')).subscribe(data => (data));
    return [lat, long];
  }
}
