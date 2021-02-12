import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { StoreModule } from '@ngrx/store';
// import * as fromLocation from './storestuff/index';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantViewComponent } from './components/restaurant-view/restaurant-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DoneIndicatorComponent } from './components/done-indicator/done-indicator.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { restaurantReducer } from './storestuff/restaurants.reducer';
import { locationReducer } from './storestuff/location.reducer';
import { requestsCompletedReducer } from './storestuff/complete.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantViewComponent,
    LoadingComponent,
    DoneIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      location: locationReducer,
      restaurants: restaurantReducer,
      complete: requestsCompletedReducer
    }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    MatSliderModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
