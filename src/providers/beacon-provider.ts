import {Injectable} from '@angular/core';
import {Platform, Events} from 'ionic-angular';
import {IBeacon} from '@ionic-native/ibeacon';
/*
 Generated class for the BeaconProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class BeaconProvider {

  delegate: any;
  region: any;

  constructor(public platform: Platform, public events: Events, private iBeacon: IBeacon) {
  }

  initialise(): any {
    let promise = new Promise((resolve, reject) => {
// we need to be running on a device
      if (this.platform.is('cordova')) {

// Request permission to use location on iOS
        this.iBeacon.requestAlwaysAuthorization();

// create a new delegate and register it with the native layer
        this.delegate = this.iBeacon.Delegate();

// Subscribe to some of the delegate's event handlers
        this.delegate.didRangeBeaconsInRegion()
          .subscribe(
            data => {
              this.events.publish('didRangeBeaconsInRegion', data);
            },
            error => console.error()
          );
console.log("seting region");
// setup a beacon region – CHANGE THIS TO YOUR OWN UUID
        //the beacon is set to 304193705b2464a98ad3910cbe0d09e
        this.region = this.iBeacon.BeaconRegion('deskBeacon', '33041937-05b2-464a-98ad-3910cbe0d09e');//F7826DA6-4FA2-4E98-8024-BC5B71E0893E //3304193705b2464a98ad3910cbe0d09e

// start ranging
        this.iBeacon.startRangingBeaconsInRegion(this.region)
          .then(
            () => {
              console.log("starting ranging in region");
              resolve(true);
            },
            error => {
              console.error('Failed to begin monitoring: ', error);
              resolve(false);
            }
          );
      } else {
        console.error("This application needs to be running on a device");
        resolve(false);
      }
    });

    return promise;
  }
}
