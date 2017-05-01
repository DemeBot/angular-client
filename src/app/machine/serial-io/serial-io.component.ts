import { Component, OnInit } from '@angular/core';
import { SerialService } from './../../shared/serial.service';

@Component({
	selector: 'app-serial-io-component',
	styleUrls: ['./serial-io.component.scss'],
	templateUrl: './serial-io.component.html',
})

export class SerialIOComponent implements OnInit {
	messages: string[] = [];
	draftCommand: string = "";

	constructor(private serialService: SerialService) {

	}

	ngOnInit() {
		this.serialService.messages.subscribe(msg => {
			this.messages.push(msg);
		});
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