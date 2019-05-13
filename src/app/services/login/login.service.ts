import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public db: AngularFirestore) { }

  getUsers(){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('/usuarios').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
}
