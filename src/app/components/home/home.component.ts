import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


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
  restaurants$: Observable<Restaurant[]> = this.store.select('restaurants');
  cuisines$: Observable<any> = this.api.getCuisines(this.location$);

  searchForm: FormGroup = new FormGroup({
    query: new FormControl(''),
    radius: new FormControl('')
  });

  constructor(private store: Store<{ location: Coordinates }>,
    private location: LocationService, 
    private api: ZomatoService,
    private actions$: Actions) { 
    }
    
    ngOnInit() {
      // Looks for Location Success
    this.actions$.pipe(
      ofType('[Location Service] Load Location')
    ).subscribe(()=>console.log('the location was successfully set'));
  }

  locate(e) {
    this.location.callGeoLocationAPI();
  }
  onSubmit(data) {
    let { query, radius } = data.value;
    console.log(`The data from the form is ${query + radius}`);
    this.api.search(query, radius, this.location$);
    //based on the data below, dynamically create cards of restaurants or something ....
    this.restaurants$.subscribe(data => console.log(data));
  }
}
