import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Store } from '@ngrx/store';
import { Restaurant } from 'src/app/models/Restaurant';
import { Coordinates } from 'src/app/models/Coordinates';
import { Observable, Subject, AsyncSubject } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { of } from 'rxjs';
import { ZomatoService } from 'src/app/services/zomato.service';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.scss']
})
export class RestaurantViewComponent implements OnInit {
  @Input() restaurants: Observable<any>;
  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {
  }
}
