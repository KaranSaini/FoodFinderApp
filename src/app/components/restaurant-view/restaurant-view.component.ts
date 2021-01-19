import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Restaurant } from 'src/app/models/Restaurant';
import { Coordinates } from 'src/app/models/Coordinates';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.scss']
})
export class RestaurantViewComponent implements OnInit {
  restaurants$: Observable<Restaurant[]> = this.store.select('restaurants').pipe(
    map(data => {
      if (data !== []) {
        return data;
      }
      return [];
    })
  );
  restaurants: Restaurant[] = [];
  constructor(private store: Store<{ location: Coordinates, restaurants: Restaurant[] }>) { }

  ngOnInit() {
    this.restaurants$.subscribe(d => console.log(d));
  }

}
