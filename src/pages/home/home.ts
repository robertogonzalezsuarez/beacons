import {Component, NgZone} from '@angular/core';
import {NavController, Platform, Events} from 'ionic-angular';
import {IBeacon} from "@ionic-native/ibeacon";
import { BeaconProvider } from '../../providers/beacon-provider';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BeaconModel } from '../../models/beacon-module';

declare var Phaser: any;

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
    // this.buildPhaserRenderer();
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

  // test with phaser
  // private buildPhaserRenderer() {
  //   var poly, graphics, game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });
  //
  //   function create() {
  //     poly = new Phaser.Polygon();
  //     poly.setTo([ new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200) ]);
  //     graphics = game.add.graphics(0, 0);
  //     graphics.beginFill(0xFF33ff);
  //     graphics.drawPolygon(poly.points);
  //     graphics.endFill();
  //   }
  // }

}
