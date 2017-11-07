import {Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class FirebaseService {
  constructor(private db: AngularFireDatabase) {
  }

  getRewards(): Observable<any[]> {
    return this.db.list('/rewards').valueChanges();
  }
}
