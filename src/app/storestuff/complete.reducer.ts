import { createReducer, on } from '@ngrx/store';

import { requestsCompleted } from './actions';

const initialState = false;

const reducer = createReducer(
    initialState,
    on(requestsCompleted, (state) => (true)),
);

export function requestsCompletedReducer(state, action) {
    return reducer(state, action);
}
