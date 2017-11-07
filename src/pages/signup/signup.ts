import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {FormBuilder,FormGroup, Validators} from "@angular/forms";
import {ServerProvider } from '../../providers/server-provider';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'signup.html'
})
export class SignUpPage {
  loginForm : any;

  constructor(public navCtrl: NavController, public formBuilder : FormBuilder, private server: ServerProvider, private storage: Storage) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      name:['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

  }

  signup() {
    var user;
    this.server.signup(this.loginForm.getRawValue()).subscribe(data=> {
      user = data;
      if (user.token) {
        this.storage.set('token',user.token);
      }
    });
  }
}
