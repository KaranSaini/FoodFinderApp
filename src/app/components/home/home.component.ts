import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { Coordinates } from 'src/app/models/Coordinates';
import { LocationService } from 'src/app/services/location.service';
import { ZomatoService } from '../../services/zomato.service';
import { MatSliderChange } from '@angular/material/slider';
import { Restaurant } from 'src/app/models/Restaurant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  location$: Observable<Coordinates> = this.store.select('location');
  locationCheck = false;
  // restaurants$: Observable<any> = this.store.select('restaurants');

  searchForm: FormGroup = new FormGroup({
    query: new FormControl(''),
    radius: new FormControl(''),
    // location: new FormControl(false, Validators.requiredTrue)
  });

  constructor(private store: Store<{ location: Coordinates }>,
              private location: LocationService,
              private api: ZomatoService,
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
      if(data) {
        this.locationCheck = true;
        console.log(this.locationCheck);
      }
    })
    // this.searchForm.patchValue({'location': true});
  }
  onSubmit(data) {
    // checking if location is set beefore looking for restaurants
    if(this.locationCheck == false) {
      alert('LOCATION IS REQUIRED TO PROCEED');
      return;
    }

    const { query, radius } = data.value;
    console.log(`The data from the form is ${query + radius}`);
    // const restaurants$: Observable<Restaurant[]> = this.api.search(query, radius, this.location$);
    this.api.search(query, radius, this.location$);
  }
}
