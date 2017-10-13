import {Component, NgZone} from '@angular/core';
import {NavController, Platform, Events} from 'ionic-angular';
import {IBeacon} from "@ionic-native/ibeacon";
import { BeaconProvider } from '../../providers/beacon-provider';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BeaconModel } from '../../models/beacon-module';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 /* constructor(public navCtrl: NavController, public ibeacon: IBeacon) {

  }
*/
  beacons: BeaconModel[] = [];
  zone: any;
  notifications: any;

  constructor(public navCtrl: NavController, public platform: Platform, public beaconProvider: BeaconProvider, public events: Events, public localNotifications: LocalNotifications) {
// required for UI update
    this.zone = new NgZone({ enableLongStackTrace: false });

    this.notifications= [];
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.beaconProvider.initialise().then((isInitialised) => {
        if (isInitialised) {
          console.log("launching BeaconListener");
          this.listenToBeaconEvents();
        }
      });
    });
  }

  listenToBeaconEvents() {
    console.log("listener Baecon");
    this.events.subscribe('didRangeBeaconsInRegion', (data) => {
    console.log("event beacon called");
// update the UI with the beacon list
      this.zone.run(() => {
      console.log("zone.run");
        this.beacons = [];

        let beaconList = data.beacons;
        beaconList.forEach((beacon) => {
          let beaconObject = new BeaconModel(beacon);
          this.beacons.push(beaconObject);
          this.keepNotifications();
        });

      });

    });
  }

  keepNotifications() {
    console.log("notification on " + this.beacons.length);
    this.beacons.forEach(function (beacon) {
      if (beacon.accuracy < 0.10) {
        if (beacon.uuid) {
          //check if the beacon was notified
          console.log("looking in  " + JSON.stringify(this.notifications));
          if (this.notifications.indexOf(beacon.uuid)<0) {
            this.localNotifications.schedule({
              id: beacon.uuid,
              text: 'Hay un beacon cerca!',
              sound: this.setSound(),
              data: {secret: "aa"}
            });
            this.notifications.push(beacon.uuid); //the beacon is set as notified
            console.log("saved as notification");
          } else {
            console.log("was notified before");
          }
        }
      }
    }.bind(this));
  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/Beep8.wav'
    } else {
      return 'file://assets/sounds/bell.mp3'
    }
  }


}
