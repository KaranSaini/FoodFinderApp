import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GcImagesearchService {
  url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBqolZUXWT3V3cQWl3HQRW36CQyEv3x-p8&cx=9fcb616d890cdd7d4&searchType=image';
  constructor(private http: HttpClient) { }

  search(query) {
    const finalURL = this.url + `&q=${query}`;
    let imageLink: string;
    this.http.get<any>(finalURL).subscribe(data => {
      imageLink = data.items[0].image.link;
      console.log(imageLink);
    });
    return of(imageLink);
  }

}
