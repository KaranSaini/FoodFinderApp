import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Store } from '@ngrx/store';
import { Restaurant } from 'src/app/models/Restaurant';
import { Coordinates } from 'src/app/models/Coordinates';
import { Observable, Subject, AsyncSubject } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { GcImagesearchService } from 'src/app/services/gc-imagesearch.service';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.scss']
})
export class RestaurantViewComponent implements OnInit, OnChanges {
  @Input() restaurants: Observable<any>;
  constructor(private image: GcImagesearchService) { }

  ngOnInit() {
    this.image.search('pizza');
  }

  ngOnChanges() {
    this.restaurants.subscribe((data) => {
      console.log('this is the information coming from parent', data);
    });
  }
}


// CAN IMPLEMENT A SHOW MORE BUTTON THAT RESULTS IN ANOTHER REQUEST WITH AN OFFSET
