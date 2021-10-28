import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-loin-basic',
	templateUrl: 'login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(public authSrv: AuthService) {
	}

	ngOnInit(): void { }

	login(event: any) {
		if (event.keyCode == 13)
			this.authSrv.login(event.target.value);
	}
}
