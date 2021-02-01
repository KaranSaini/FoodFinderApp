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
              private actions$: Actions) {}
  ngOnInit() {
      // Looks for Location Success
    this.actions$.pipe(
      ofType('[Location Service] Load Location')
    ).subscribe(() => {
      console.log('the location was successfully set');
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
    // this.searchForm.patchValue({'location': true});
  }
  async onSubmit(data) {
    // checking if location is set before looking for restaurants
    if (this.locationCheck === false) {
      alert('LOCATION IS REQUIRED TO PROCEED');
      return;
    }

    const { query, radius } = data.value;
    console.log(`The data from the form is ${query + radius}`);
    if (!query || !radius) {
      alert('QUERY AND RADIUS ARE REQUIRED');
      return;
    }

    const searchCheck = await this.api.search(query, radius, this.location$);
    console.log(searchCheck);
    this.loadingDone = true;
  }
}
