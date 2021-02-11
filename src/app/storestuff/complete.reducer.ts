import { createReducer, on } from '@ngrx/store';

import { requestsCompleted } from './actions';

const initialState = false;

export const requestsCompletedReducer = createReducer(
    initialState,
    on(requestsCompleted, (state) => (true)),
);
