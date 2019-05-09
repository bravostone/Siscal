import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  createUser(value){

    return this.db.collection('Prueba').add({
      Descripcion: value.descripcion,
    });
  }

  getUsers(){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('/Prueba').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
}
