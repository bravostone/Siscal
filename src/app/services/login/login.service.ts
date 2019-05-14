import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public db: AngularFirestore) { }

  validateUser(loginModel){
    // return new Promise<any>((resolve, reject) => {
    //   this.db.collection('/usuarios').snapshotChanges()
    //   .subscribe(snapshots => {
    //     resolve(snapshots)
    //   })
    // })

    return new Promise<any>((resolve, reject) => {
      this.db.collection('/usuarios',ref => ref.where('Alias', '==', loginModel.usuario)
      .where('Contrasena', '==', loginModel.contrasena)).snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
}
