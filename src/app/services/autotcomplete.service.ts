import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AutotcompleteService {

  constructor(private url: string, private http: Http) { }

  generateKeywordList(searchterm: string){
    return this.http.get(this.url+searchterm.replace(' ','%20'))
      .map(response => response.json());
  }
}
