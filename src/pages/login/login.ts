import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {FormBuilder,FormGroup, Validators} from "@angular/forms";
import {ServerProvider} from "../../providers/server-provider";
import {SignUpPage} from "../signup/signup";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: any;

  constructor(public navCtrl: NavController, public formBuilder : FormBuilder, private server: ServerProvider, private storage: Storage) {
    this.server = server;
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  login() {
    // this.navCtrl.push(TabsPage);
    var user;
    this.server.login(this.loginForm.getRawValue()).subscribe(data=> {
      user = data;
      if (user.token) {
        this.storage.set('token',user.token);
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  goToSignup() {
    this.navCtrl.setRoot(SignUpPage);
  }
}
