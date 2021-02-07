import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { Coordinates } from 'src/app/models/Coordinates';
import { LocationService } from 'src/app/services/location.service';
import { ZomatoService } from '../../services/zomato.service';
import { Restaurant } from 'src/app/models/Restaurant';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loadingDone = false;
  location$: Observable<Coordinates> = this.store.select('location');
  restaurants$: Observable<any> = this.store.select('restaurants').pipe(pluck('restaurants'));
  locationCheck = false;
  // restaurants$: Observable<any> = this.store.select('restaurants');

  // ALERT --- CHANGE DEFAULT VAL LATER THIS IS JUST TO SAVE TIME...
  searchForm: FormGroup = new FormGroup({
    query: new FormControl('burgers', Validators.required),
    radius: new FormControl(10, Validators.required),
  });

  constructor(public store: Store<{ location: Coordinates, restaurants: Restaurant[] }>,
              private location: LocationService,
              public api: ZomatoService,
              private actions$: Actions,
              public loading: LoadingService
              ) {}
  ngOnInit() {
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
    this.loading.requestStarted();
    if (this.locationCheck === false) {
      alert('LOCATION IS REQUIRED TO PROCEED');
      return;
    }

    const { query, radius } = data.value;
    if (!query || !radius) {
      alert('QUERY AND RADIUS ARE REQUIRED');
      return;
    }

    this.api.search(query, radius, this.location$).then(() => {
      this.loadingDone = true;
    });
  }
}
