import { createReducer, on, Action } from '@ngrx/store';

import { Coordinates } from '../models/Coordinates';
import { locationAvailable } from './actions';

export const initialState: Coordinates = undefined;

const reducer = createReducer(
    initialState,
    on(locationAvailable, (state, { coordinate }) => ({ latitude: coordinate.latitude, longitude: coordinate.longitude }))
);

export function locationReducer(state, action) {
    return reducer(state, action);
}
