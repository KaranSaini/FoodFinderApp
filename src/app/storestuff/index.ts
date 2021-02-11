// import {
//   Action,
//   ActionReducer,
//   ActionReducerMap,
//   createFeatureSelector,
//   createReducer,
//   createSelector,
//   MetaReducer,
//   on
// } from '@ngrx/store';

// import * as LocationActions from './actions';
// import { Coordinates } from '../models/Coordinates';
// import { Restaurant } from '../models/Restaurant';

// // Defining Shape of State for App
// export interface State {
//   location: Coordinates;
//   restaurants: [];
// }

// // Defining iniital values (there are none)
// export const iniitialState: State = {
//   location: {
//     latitude: undefined,
//     longitude: undefined
//   },
//   restaurants: []
// };

// const locationReducer = createReducer(
//   iniitialState,
//   on(LocationActions.locationAvailable, (state: State, { coordinate }) => {
//     return { location: { latitude: coordinate.latitude, longitude: coordinate.longitude }, ...state};
//   }),
//   on(LocationActions.restaurantsAvailable, ( state: State, {initialRestaurants} ) => {
//     return { restaurants: initialRestaurants};
//   }),
//   on(LocationActions.moreRestaurants, (state: State, {newRestaurants}) => {
//     return {  restaurants: state.restaurants.concat(newRestaurants) };
//   })
// );

// export function reducer(state: State | undefined, action: Action) {
//   return locationReducer(state, action);
// }


import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as Actions from './actions';
import { Coordinates } from '../models/Coordinates';
import { Restaurant } from '../models/Restaurant';
import { InjectionToken } from '@angular/core';

// Log All Actions
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}
export const metaReducers: MetaReducer<any>[] = !environment.production ? [logger] : [];
