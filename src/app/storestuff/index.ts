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
  restaurants: []
};

const locationReducer = createReducer(
  iniitialState,
  on(LocationActions.locationAvailable, (state: State, { coordinate }) => {
    return { ...state, location: { latitude: coordinate.latitude, longitude: coordinate.longitude }};
  }),
  on(LocationActions.restaurantsAvailable, (state: State, { restaurants }) => {
    return { ...state, restaurants: [...restaurants]};
  })
);

export function reducer(state: State | undefined, action: Action) {
  return locationReducer(state, action);
}