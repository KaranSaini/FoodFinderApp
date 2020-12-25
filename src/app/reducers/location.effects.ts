import { Injectable } from '@angular/core';
import { 
    Effect,
    Actions,
    createEffect,
    ofType 
} from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {
    map,
    mergeMap,
    catchError,
    switchMap
} from 'rxjs/operators';

import * as LocationActions from './location.actions';


@Injectable()
export class LocationEffects {
    constructor(
        private actions$: Actions,
    ) {}
    // @Effect()
    // loadLocation$ = this.actions$.pipe(
    //     ofType(LocationActions.getLocation),
    //     switchMap(() => {

    //     })
    // )
}