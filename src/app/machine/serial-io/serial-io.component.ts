import { Component, OnInit } from '@angular/core';
import { SerialService } from './../../shared/serial.service';

@Component({
	selector: 'serial-io-component',
	template: `
		<div class="messages">
			<h2>Recieved messages:</h2>
			<p *ngFor="let msg of messages">
				<strong>{{msg}}</strong> 
			</p>
		</div>
	`
})

export class SerialIOComponent implements OnInit {
	messages: string[] = [];

	constructor(private serialService: SerialService) {

	}

	ngOnInit() {
		this.serialService.messages.subscribe(msg => {
			console.log("serial-io1");
			this.messages.push(msg);
		});

		this.serialService.messages.subscribe(msg => {
			console.log("serial-io2");
		});
	}
}