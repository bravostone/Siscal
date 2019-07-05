import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListaProyectosService {

  constructor(public db: AngularFirestore) { 
    db.firestore.settings({ timestampsInSnapshots: true });
  }

  getProyectos(){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('/Proyecto').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      });
    });
  }
}
