import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Coordinates } from 'src/app/models/Coordinates';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { ZomatoService } from '../../services/zomato.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  location$: Observable<Coordinates> = this.store.select(state => state.location);
  cuisines$: Observable<any> = this.api.getCuisines(this.location$);

  constructor(private store: Store<{ location: Coordinates }>,
    private location: LocationService, 
    private api: ZomatoService) { }

  ngOnInit() {
    // Prompting getting the location and then setting it in the global app state -- MISSION CRITICAL
    this.location.callGeoLocationAPI();
    // this.api.getCuisines(this.location$).subscribe(res => {
    //   console.log(res);
    // });
  }
}
