import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {FirebaseService} from '../../providers/firebase-service';

@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html'
})
export class RewardsPage {

  public rewards: Observable<any[]>
  constructor(public navCtrl: NavController, private  firebase: FirebaseService) {
    this.rewards = this.firebase.getRewards();

  }

}
