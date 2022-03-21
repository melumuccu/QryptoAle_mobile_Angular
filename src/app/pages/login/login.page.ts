import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ampAuthRegion: string;
  ampAuthUserPoolId: string;
  ampAuthUserPoolWebClientId: string;
  apiBaseUrl: string;
  localstorageBaseKey: string;

  /** constructor */
  constructor() {}

  /** lifecycle - init */
  ngOnInit() {
    this.ampAuthRegion = environment.amplify.Auth.region;
    this.ampAuthUserPoolId = environment.amplify.Auth.userPoolId;
    this.ampAuthUserPoolWebClientId = environment.amplify.Auth.userPoolWebClientId;
    this.apiBaseUrl = environment.apiBaseUrl;
    this.localstorageBaseKey = environment.localstorageBaseKey;
  }
}
