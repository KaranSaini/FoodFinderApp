import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Store } from '@ngrx/store';
import { Restaurant } from 'src/app/models/Restaurant';
import { Coordinates } from 'src/app/models/Coordinates';
import { Observable, Subject, AsyncSubject } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { ZomatoService } from 'src/app/services/zomato.service';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.scss']
})
export class RestaurantViewComponent implements OnInit {
  @Input() restaurants: Observable<any>;
  i = 1;
  constructor(
    public api: ZomatoService) { }

  ngOnInit() {
  }

  getMore() {
    if (this.i < 4) {
      this.api.searchWithOffset(this.i++);
    }
  }
}


// CAN IMPLEMENT A SHOW MORE BUTTON THAT RESULTS IN ANOTHER REQUEST WITH AN OFFSET
