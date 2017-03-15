import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { PlotContent } from './plotContent';



const baseUrl: string = window.location.origin;

@Injectable()
export class PlantService {

    serviceUrl;

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
        this.serviceUrl += ":8080" + "/plots/api";
    }

    getPlants(): Promise<PlotContent[]> {
        return this.http.get( this.serviceUrl )
        .toPromise()
        .then( response => response.json().plants as PlotContent[] )
        .catch( this.handleError )
    }

    private handleError( error: any ): Promise<any> {
      console.error( 'An error occurred', error );
      return Promise.reject( error.message || error );
    }
}
