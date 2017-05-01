import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges } from '@angular/core';
import { SerialService } from './../../shared/serial.service';

@Component({
	selector: 'app-serial-io-component',
	styleUrls: ['./serial-io.component.scss'],
	templateUrl: './serial-io.component.html',
})

export class SerialIOComponent implements OnInit, OnChanges {
	@ViewChild('messageWindow') messageChild: ElementRef;
	@Input() messageInput: string;

	messages: string[] = [];
	draftCommand: string = "";

	constructor(private serialService: SerialService) {
	}

	ngOnInit() {
		let messageElem = this.messageChild.nativeElement;
		this.serialService.messages.subscribe(msg => {
			this.messages.push(msg);
			setTimeout( () => {
				messageElem.scrollTop = messageElem.scrollHeight;
			}, 0 );
		});
	}

	ngOnChanges() {
		if ( this.messageInput ) {
			this.draftCommand = this.messageInput;
		}
	}

	onEnter( event: Event ): void {
		this.sendMessage();
		event.preventDefault();
	}

	sendMessage():void {
		const m: string = this.draftCommand;
		this.serialService.sendMessage( m );
		this.draftCommand = ""
	}
}