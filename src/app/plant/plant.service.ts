import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Plant } from './plant';

const mockPlants: Plant[] = [
  {
    'id': 1,
    'height': 300,
    'width': 0,
    'depth': 0,
    'days_to_harvest': 0,
    'name': 'lettuce',
    'description': '',
    'ended_at': new Date(null),
    'created_at': new Date('2017-02-26T01:03:49.000Z')
  }, {
    'id': 2,
    'height': 0,
    'width': 0,
    'depth': 0,
    'days_to_harvest': 0,
    'name': 'chives',
    'description': '',
    'ended_at': new Date(null),
    'created_at': new Date('2017-02-26T19:17:12.000Z')
  }, {
    'id': 3,
    'height': 0,
    'width': 0,
    'depth': 0,
    'days_to_harvest': 0,
    'name': 'dill',
    'description': '',
    'ended_at': new Date(null),
    'created_at': new Date('2017-02-26T19:17:19.000Z')
  }

]

const baseUrl: string = window.location.origin;

@Injectable()
export class PlantService {

    serviceUrl: string;

    constructor( private http: Http ) {
        // If baseUrl has a port number
        if ( ( baseUrl.match(/:/g) || [] ).length > 1 ) {
            // remove port number
            // this.serviceUrl = baseUrl.substr(0,baseUrl.lastIndexOf("\:"));
            // Set service url to beta site
            this.serviceUrl = "http://beta.ungear.us"
        }
        else {
            this.serviceUrl = baseUrl;
        }
        this.serviceUrl += ":8080" + "/plants/api";
    }

    getPlants(): Promise<Plant[]> {
        return this.http.get( this.serviceUrl )
        .toPromise()
        .then( response => response.json().plants as Plant[] )
        .catch( this.handleError )
    }

    private handleError( error: any ): Promise<any> {
      console.error( 'An error occurred', error );
      return Promise.reject( error.message || error );
    }
}