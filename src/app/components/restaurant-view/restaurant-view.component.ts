import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Restaurant } from 'src/app/models/Restaurant';
import { Coordinates } from 'src/app/models/Coordinates';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.scss']
})
export class RestaurantViewComponent implements OnInit {
  restaurants$: Observable<any> = this.store.select('restaurants');
  constructor(private store: Store<{ location: Coordinates, restaurants: Restaurant[] }>) { }


  // SOMETHING WEIRD IS GOING ON WITH STRUCTURE OF DATA COMING IN .... WORK ON THIS
  ngOnInit() {
    this.restaurants$.pipe(
      map(data => (data.restaurants))
    ).subscribe(d => console.log(d));
  }

}
