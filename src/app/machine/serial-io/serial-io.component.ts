import { Component, OnInit } from '@angular/core';
import { SerialService } from './../../shared/serial.service';

@Component({
	selector: 'serial-io-component',
	template: `
		<div class="messages">
			<h2>Recieved messages:</h2>
			<p *ngFor="let msg of messages">
				<strong>({{msg}})</strong> 
			</p>
		</div>
	`,
    providers: [ SerialService ]
})

export class SerialIOComponent implements OnInit {
	messages: string[] = [];

	constructor(private serialService: SerialService) {

	}

	ngOnInit() {
		this.serialService.messages.subscribe(msg => {
			this.messages.push(msg);
		});
	}
}