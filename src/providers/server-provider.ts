import {Injectable} from '@angular/core';
import {Platform, Events} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
/*
 Generated class for the ServerProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ServerProvider {

  delegate: any;
  region: any;
  path: string;
  httpService: Http;
  timeoutMS: number;
  constructor(public platform: Platform, public events: Events, public http: Http) {
    this.path = "https://wataru-183411.appspot.com/_ah/api/wataruApi/v1";
    this.timeoutMS = 10000;
    this.httpService = http;

  }

  initialise(): any {

  }

  public login(user): Observable<any> {
    let loginPath = this.path + "/login";
    return this.httpService.post(encodeURI(loginPath), user).map(res => res.json());
  }

  public signup(user): Observable<any> {
    let loginPath = this.path + "/signup";
    return this.httpService.post(encodeURI(loginPath), user).map(res => res.json());
  }
}
