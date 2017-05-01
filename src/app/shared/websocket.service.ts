import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

const baseUrl: string = window.location.origin;

@Injectable()
export class WebSocketService {

    serviceUrl : string;

    ws: WebSocket;

    private socket: Subject< MessageEvent >;

    public connect( url: string = this.serviceUrl ) : Subject< MessageEvent > {
        if( !this.socket ) {
            this.socket = this.create( url );
        }

        return this.socket;
    }

    private create( url: string = this.serviceUrl ): Subject< MessageEvent > {
        let ws = new WebSocket( url );

        let observable = Observable.create(
            ( obs: Observer< MessageEvent > ) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);

                return ws.close.bind(ws);
            }
        );

        let observer = {
            next: ( data: MessageEvent ) => {
                if ( ws.readyState === WebSocket.OPEN ) {
                    ws.send( data.data );
                }
            }
        };

        return Subject.create( observer, observable );
    }

    constructor() {
        // If baseUrl has a port number
        if ( ( baseUrl.match(/:/g) || [] ).length > 1 ) {
            // Set service url to beta site
            this.serviceUrl = "ws://beta.ungear.us"
        }
        else {
            this.serviceUrl = 'ws://' + window.location.hostname;
        }
        this.serviceUrl += ":8080" + "/serial/";
    }
}
