import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { Coordinates } from 'src/app/models/Coordinates';
import { LocationService } from 'src/app/services/location.service';
import { ZomatoService } from '../../services/zomato.service';
import { Restaurant } from 'src/app/models/Restaurant';
import { LoadingService } from '../loading/loading.service';

import * as actions from '../../storestuff/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loadingDone = false;
  loadRestaurants = false;
  location$: Observable<Coordinates> = this.store.select('location');
  restaurants$: Observable<any> = this.store.select('restaurants');
  locationCheck = false;
  complete$: Observable<any> = this.store.select('complete');
  // restaurants$: Observable<any> = this.store.select('restaurants');

  // ALERT --- CHANGE DEFAULT VAL LATER THIS IS JUST TO SAVE TIME...
  searchForm: FormGroup = new FormGroup({
    query: new FormControl('', Validators.required),
    radius: new FormControl(10, Validators.required),
  });

  constructor(public store: Store<{ location: Coordinates, restaurants: Restaurant[], complete: boolean }>,
              private location: LocationService,
              public api: ZomatoService,
              private actions$: Actions,
              public loading: LoadingService,
              ) {}

   ngOnInit() {
    let searchCount = 0;
    const searchSub = new BehaviorSubject<number>(searchCount);
    this.actions$.pipe(
      ofType('[Zomato Service] More Restaurants Received')
    ).subscribe(() => searchSub.next(searchCount++));
    searchSub.subscribe((data) => {
      console.log(data);
      if (data === 3) {
        this.store.dispatch(actions.requestsCompleted());
        searchCount = 0;
      }
    });
    this.complete$.subscribe((data) => {
      if (data) {
        console.log(data);
        this.loadRestaurants = true;
      }
    });
  }

  locate(e) {
    this.location.callGeoLocationAPI();
    // Checking to make sure location is captured before proceeding.
    this.location$.subscribe(data => {
      if (data) {
        this.locationCheck = true;
      }
    });
  }
  onSubmit(data) {
    // checking if location is set before looking for restaurants
    if (this.locationCheck === false) {
      alert('LOCATION IS REQUIRED TO PROCEED');
      return;
    }

    const { query, radius } = data.value;
    if (!query || !radius) {
      alert('QUERY AND RADIUS ARE REQUIRED');
      return;
    }
    this.loading.requestStarted();

    this.api.search(query, radius, this.location$).then(() => {
      this.loadingDone = true;
    });
  }
}
