import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
  })
  export class ImagenNoConformidadService {

    constructor( public firebase: AngularFireStorage) { 
      }

      //Subir archivo
      public subirImagenStorage(nombreArchivo: string, datos: any) {

        // Create a root reference
        var storageRef = this.firebase.storage.ref();
        // File or Blob named mountains.jpg
        var file = datos;
        // Create the file metadata
        var metadata = {
          contentType: 'image/jpeg'
        };
        // Upload file and metadata to the object
          var uploadTask = storageRef.child('images/' + nombreArchivo).put(file, metadata);

          //this.descargarImagenStorage(nombreArchivo);
      };

      public descargarImagenStorage(nombreArchivo) {
        var result = "";
        
        // Create a reference to the file we want to download
        var starsRef = this.firebase.storage.ref().child('images/' + nombreArchivo);
    
        // Get the download URL
       starsRef.getDownloadURL().then(function (url) {
        console.log(url);
        return url;
        })
        //console.log(url);
        //return result;
      }
  }