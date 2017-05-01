import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { MachineState } from './machine-state';
import { WebSocketService } from './websocket.service';

const stateRegex: RegExp = /ok C: ([RTZrtz]:[0-9.]*[ ]?)*/;

@Injectable()
export class SerialService {

    public messages: Subject< string > = new Subject< string >();
    public states: Subject< MachineState > = new Subject< MachineState >();
    private connection: Subject< MessageEvent >;

    constructor( private websocketService: WebSocketService ) {

        this.connection = this.websocketService.connect();

        this.messages = < Subject< string > >this.connection
            .map( ( response: any ): string => {
                return response.data;
            } )
            .share();
        
        this.states = < Subject< MachineState > >this.messages
            .filter( ( message: string, index: number ) => {
               return stateRegex.test( message );
            } )
            .map( ( message: string ): MachineState => {
                console.log( message )

                let regex_R:RegExp = /R:([0-9.]*)/;
                let regex_T:RegExp = /T:([0-9.]*)/;
                let regex_Z:RegExp = /Z:([0-9.]*)/;

                let state_R: number = parseFloat(regex_R.exec( message )[1]);
                let state_T: number = parseFloat(regex_T.exec( message )[1]);
                let state_Z: number = parseFloat(regex_Z.exec( message )[1]);

                let state: MachineState = {
                    R: state_R,
                    T: state_T,
                    Z: state_Z
                };

                return state;

            } )
            .share();
    }

    sendMessage( message: string ) {
        let m = new MessageEvent( 'message', { data: message } );
        console.log( "Sending command:" + JSON.stringify( m ) );
        this.connection.next( m );
    }
}
