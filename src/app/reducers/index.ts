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
import { environment } from '../../environments/environment';

import * as LocationActions from './location.actions';
import { Coordinates } from '../models/Coordinates';

// Defining Shape of State for App
export interface State {
  location: Coordinates
}

// Defining iniital values (there are none)
export const iniitialState: State = {
  location: null
};

const locationReducer = createReducer(
  iniitialState,
  on(LocationActions.locationAvailable, (state: State, { coordinate }) => ({ location: { latitude: coordinate.latitude, longitude: coordinate.longitude } }))
);

export function reducer(state: State | undefined, action: Action) {
  return locationReducer(state, action);
}