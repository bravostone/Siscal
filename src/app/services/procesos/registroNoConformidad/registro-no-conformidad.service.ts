import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegistroNoConformidad } from '../../../interfaces/procesos/registroNoConformidad/registro-no-conformidad';

@Injectable({
  providedIn: 'root'
})
export class RegistroNoConformidadService {

  constructor(public firebase: AngularFirestore) { 
    firebase.firestore.settings({ timestampsInSnapshots: true });
  }

  getListado(request) {
   var lista=  new Promise<any>((resolve, reject) => {
      this.firebase.collection('/rnc',ref => ref.where('CodigoProyecto', '==', request.CodigoProyecto)).snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
    return lista;
  }

  getRegistro(request) {
    var lista =  new Promise((resolve, reject) => {
       this.firebase.collection('/rnc',ref => ref.where('CodigoProyecto', '==', request.CodigoProyecto).where('Nro','==',request.Nro)).snapshotChanges()
       .subscribe(snapshots => {
         resolve(snapshots)
         //resolve(snapshots[0].payload.doc.data())
       })
     })
     //lista.key = item.payload.doc._key.path.segments[6];
     return lista;
   }
  createRNC(obj:RegistroNoConformidad)
  {
    return this.firebase.collection('rnc').add({
      Area: obj.Area,
      CodigoProyecto: obj.CodigoProyecto,
      Defecto: obj.Defecto,
      Estado: obj.Descripcion,
      EjecutorDanio: obj.EjecutorDanio,
      Estatus: obj.Estatus,
      FechaEmision: obj.FechaEmision,
      HHTrabajo: obj.HHTrabajo,
      NombreOriginador: obj.NombreOriginador,
      Nro: obj.Nro,
      Observaciones: obj.Observaciones,
      TipoReporte: obj.TipoReporte,
      TratamientoNoConformidad: obj.TratamientoNoConformidad,
      ListaImagenes: obj.ListaImagenes,
    });
  }

  editRNC(obj:RegistroNoConformidad){
    return this.firebase.doc('rnc/' + obj.Key).update(obj);    
  }
}
