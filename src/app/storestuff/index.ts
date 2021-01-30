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

import * as LocationActions from './actions';
import { Coordinates } from '../models/Coordinates';
import { Restaurant } from '../models/Restaurant';

// Defining Shape of State for App
export interface State {
  location: Coordinates;
  restaurants: [];
}

// Defining iniital values (there are none)
export const iniitialState: State = {
  location: {
    latitude: undefined,
    longitude: undefined
  },
  restaurants: []
};

const locationReducer = createReducer(
  iniitialState,
  on(LocationActions.locationAvailable, (state: State, { coordinate }) => {
    return { location: { latitude: coordinate.latitude, longitude: coordinate.longitude }, ...state};
  }),
  on(LocationActions.restaurantsAvailable, ( state: State, {initialRestaurants} ) => {
    return { restaurants: initialRestaurants};
  }),
  on(LocationActions.moreRestaurants, (state: State, {newRestaurants}) => {
    return {  restaurants: state.restaurants.concat(newRestaurants) };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return locationReducer(state, action);
}
