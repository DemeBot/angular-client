import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

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

    getContents(): Promise < PlotContent[] > {
        return this.http.get( this.serviceUrl + "/contents" )
        .toPromise()
        .then( response => response.json().plot_content as PlotContent[] )
        .catch( this.handleError )
    }

    deleteContent( _id: number ): Promise < PlotContent > {

        let body = {
            id: _id,
        }
        let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' });
        let options = new RequestOptions({ headers: headers, body: body });

        return this.http.delete( this.serviceUrl + "/contents", options )
        .toPromise()
        .then( response => response.json()[0] as PlotContent )
        .catch( this.handleError );
    }

    addContent( plant_types_id: number, plot_positions_id: number ): Promise < PlotContent > {
        let body = {
            planted_at: new Date(),
            PLANT_TYPES_id: plant_types_id,
            PLOT_POSITIONS_id: plot_positions_id
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post( this.serviceUrl + "/contents", body )
        .toPromise()
        .then( response => response.json() as PlotContent )
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
