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

    private lastState: MachineState;

    constructor( private websocketService: WebSocketService ) {

        this.lastState = {
            R: 0,
            T: 0,
            Z: 0
        }

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
                console.log( "Parsng State:" + message )

                let regex_R:RegExp = /[Rr]:([0-9.]*)/;
                let regex_T:RegExp = /[Tt]:([0-9.]*)/;
                let regex_Z:RegExp = /[Zz]:([0-9.]*)/;

                let pos_R = regex_R.exec( message )[1];
                let pos_T = regex_T.exec( message )[1];
                let pos_Z = regex_Z.exec( message )[1];

                console.log(pos_R);
                console.log(pos_T);
                console.log(pos_Z);

                let state_R: number = parseFloat(pos_R);
                let state_T: number = parseFloat(pos_T);
                let state_Z: number = parseFloat(pos_Z);

                let state: MachineState = {
                    R: state_R,
                    T: state_T,
                    Z: state_Z
                };

                console.log( JSON.stringify( state ) );

                return state;

            } )
            .share();
    }

    sendMessage( message: string ) {
        let m = new MessageEvent( 'message', { data: message } );
        console.log( "Sending command:" + JSON.stringify( message ) );
        this.connection.next( m );
    }
}
