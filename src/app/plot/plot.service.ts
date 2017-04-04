import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { PlotContent } from './plotContent';
import { PlotPosition } from './plotPositions';



const baseUrl: string = window.location.origin;

@Injectable()
export class PlotService {

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
        this.serviceUrl += ":8080" + "/plot/api";
    }

    getContents(): Promise<PlotContent[]> {
        return this.http.get( this.serviceUrl + "/contents" )
        .toPromise()
        .then( response => response.json().plot_content as PlotContent[] )
        .catch( this.handleError )
    }

    getPositions(): Promise<PlotPosition[]> {
        return this.http.get( this.serviceUrl + "/positions" )
        .toPromise()
        .then( response => response.json().plot_position as PlotPosition[] )
        .catch( this.handleError )
    }

    private handleError( error: any ): Promise<any> {
      console.error( 'An error occurred', error );
      return Promise.reject( error.message || error );
    }
}
