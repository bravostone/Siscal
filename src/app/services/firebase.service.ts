import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  createUser(obj){

    return this.db.collection('usuarios').add({
      Nombres: obj.Nombres,
      Apellidos: obj.Apellidos,
      Alias: obj.Apellidos,
      Estado: obj.Estado,
    });
  }

  getUsers(){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('/usuarios').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
}
