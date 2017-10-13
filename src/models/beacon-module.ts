export class BeaconModel {

  uuid: string;
  major: number;
  minor: number;
  rssi: number;
  accuracy: number;
  distance: number;

  constructor(public beacon: any) {
    this.uuid = beacon.uuid;
    this.major = beacon.major;
    this.minor = beacon.minor;
    this.rssi = beacon.rssi;
    this.accuracy = beacon.accuracy;
    this.distance = beacon.distance;
  }
}
