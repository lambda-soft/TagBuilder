import { AutotcompleteService } from './autotcomplete.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AmazonAutoCompleteService extends AutotcompleteService {

  constructor(http: Http) { 
    super("https://api.slkcellular.com/api/amazon?q=",http);
  }

}
