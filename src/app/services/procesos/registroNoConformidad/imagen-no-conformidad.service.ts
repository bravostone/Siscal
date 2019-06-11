import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
  })
  export class ImagenNoConformidadService {

    constructor( private storage: AngularFireStorage) { 
      }

      //Subir archivo
      public tareaCloudStorage(nombreArchivo: string, datos: any) {
        return this.storage.upload(nombreArchivo, datos);
      }

      //Descargar del archivo
      public referenciaCloudStorage(nombreArchivo: string) {
        return this.storage.ref(nombreArchivo);
      }
  }