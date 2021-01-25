import { createAction, props } from '@ngrx/store';
import { Coordinates } from '../models/Coordinates';
import { Restaurant } from '../models/Restaurant';

export const locationAvailable = createAction(
    '[Location Service] Load Location',
    props<{ coordinate: Coordinates }>()
);

export const restaurantsAvailable = createAction(
    '[Zomato Service] Restaurants Received',
    props<{ restaurants: [] }>()
);
