import { Component, OnInit } from '@angular/core';

import {ApiCommunicationService} from '../../services/api-communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiCommunicationService) { }

  ngOnInit() {
    //Setting coordinates in service
    this.api.getCuisines();
  }

}
