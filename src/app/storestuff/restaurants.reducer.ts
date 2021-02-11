import { createReducer, on, Action } from '@ngrx/store';

import { restaurantsAvailable, moreRestaurants } from './actions';

export const initialState: ReadonlyArray<any> = [];

const reducer = createReducer(
    initialState,
    on(restaurantsAvailable, (state, { initialRestaurants }) => ([...initialRestaurants])),
    on(moreRestaurants, (state, { newRestaurants }) => ([...state, ...newRestaurants])),
);

export function restaurantReducer(state, action) {
    return reducer(state, action);
}
