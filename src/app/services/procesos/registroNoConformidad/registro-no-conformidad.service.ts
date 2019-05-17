import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegistroNoConformidadService {

  constructor(public firebase: AngularFirestore) { 
    firebase.firestore.settings({ timestampsInSnapshots: true });
  }

  getListado() {
   var lista=  new Promise<any>((resolve, reject) => {
      this.firebase.collection('/rnc').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
    return lista;
  }
}
