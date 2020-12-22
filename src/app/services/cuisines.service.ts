import { Injectable } from '@angular/core';

import { ApiCommunicationService } from './api-communication.service';

@Injectable({
  providedIn: 'root'
})
export class CuisinesService {
  constructor(private api: ApiCommunicationService) { }

}
