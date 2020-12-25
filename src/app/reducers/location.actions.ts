import { createAction, props } from '@ngrx/store';
import { Coordinates } from '../models/Coordinates';


export const locationAvailable = createAction(
    '[Location Service] Load Location',
    props<{ coordinate: Coordinates }>()
);