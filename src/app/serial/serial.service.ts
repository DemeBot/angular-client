import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

const baseUrl: string = 'ws://' + window.location.hostname;//window.location.origin;

@Injectable()
export class SerialService {

    serviceUrl : string;

    ws: WebSocket;

    constructor( private http: Http ) {
        // If baseUrl has a port number
        if ( ( baseUrl.match(/:/g) || [] ).length > 1 ) {
            // remove port number
            // this.serviceUrl = baseUrl.substr(0,baseUrl.lastIndexOf("\:"));
            // Set service url to beta site
            this.serviceUrl = "ws://beta.ungear.us"
        }
        else {
            this.serviceUrl = baseUrl;
        }
        this.serviceUrl += ":8080" + "/serial/";

        this.ws = new WebSocket( this.serviceUrl );

        this.ws.onopen = ( event ) => {
            console.log( "OPENED!" );
        };

        this.ws.onmessage = ( event ) => {
            console.log( event );
        };
    }
}
