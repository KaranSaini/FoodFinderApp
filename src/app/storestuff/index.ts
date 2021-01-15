import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';

import * as LocationActions from './location.actions';
import { Coordinates } from '../models/Coordinates';
import { Restaurant } from '../models/Restaurant';

// Defining Shape of State for App
export interface State {
  location: Coordinates;
  restaurants: Restaurant[];
}

// Defining iniital values (there are none)
export const iniitialState: State = {
  location: {
    latitude: undefined,
    longitude: undefined
  },
  restaurants: [{
    R: undefined,
    average_cost_for_two: undefined,
    cuisines: undefined,
    establishment: undefined,
    establishment_types: undefined,
    highlights: undefined,
    location: undefined,
    menu_url: undefined,
    name: undefined,
    offers: undefined,
    phone_numbers: undefined,
    photos_url: undefined,
    user_rating: undefined
  }]
};

const locationReducer = createReducer(
  iniitialState,
  on(LocationActions.locationAvailable, (state: State, { coordinate }) => {
    return { ...state, location: { latitude: coordinate.latitude, longitude: coordinate.longitude }};
  }),
  on(LocationActions.restaurantsAvailable, (state: State, incomingRestaurants) =>  {
    return { ...state,  restaurants: [...state.restaurants, incomingRestaurants]};
  })
);

export function reducer(state: State | undefined, action: Action) {
  return locationReducer(state, action);
}