import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Coordinates } from 'src/app/models/Coordinates';

import { Observable } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  location$: Observable<Coordinates> = this.store.select(state => state.location);
  
  constructor(private store: Store<{ location: Coordinates }>,
    private location: LocationService) { }

  ngOnInit() {
    // Prompting getting the location and then setting it in the global app state -- MISSION CRITICAL
    this.location.callGeoLocationAPI();
  }
}
