import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private count = 0;
  private loadingIndicator$ = new BehaviorSubject<string>('');
  constructor() { }

  getSpinnerObserver(): Observable<string> {
    return this.loadingIndicator$.asObservable();
  }
  requestStarted() {
    if (++this.count === 1) {
      this.loadingIndicator$.next('start');
      console.log('loading should start');
    }
  }
  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.loadingIndicator$.next('end');
      console.log('loading should stop');
    }
  }
  resetSpinner() {
    this.count = 0;
    this.loadingIndicator$.next('end');
  }
}
