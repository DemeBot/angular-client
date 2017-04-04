import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { WebSocketService } from './websocket.service';

const baseUrl: string = window.location.origin;

@Injectable()
export class SerialService {

    public messages: Subject< string > = new Subject< string >();

    constructor( private websocketService: WebSocketService ) {

        this.messages = < Subject< string > >this.websocketService
            .connect()
            .map( ( response: any ): string => {
                console.log( response );
                return response.data;
            } )
    }
}
