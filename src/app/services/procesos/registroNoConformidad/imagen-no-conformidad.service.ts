import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
import { Image } from "src/app/interfaces/procesos/registroNoConformidad/registro-no-conformidad";

@Injectable({
  providedIn: "root"
})
export class ImagenNoConformidadService {
  imagenUrl: string = "http";

  constructor(public firebase: AngularFireStorage, private http: Http) {}

  //Subir archivo
  public subirImagenStorage(nombreArchivo: string, datos: any) {
    debugger;
    // Create a root reference
    var storageRef = this.firebase.storage.ref();
    // File or Blob named mountains.jpg
    var file = datos;
    // Create the file metadata
    var metadata = {
      contentType: "image/jpeg"
    };
    // Upload file and metadata to the object
    var uploadTask = storageRef
      .child("images/" + nombreArchivo)
      .put(file, metadata);

    //this.descargarImagenStorage(nombreArchivo);
  }

  public descargarImagenStorage(nombreArchivo) {
    var result = "";

    // Create a reference to the file we want to download
    var starsRef = this.firebase.storage.ref().child("images/" + nombreArchivo);

    // Get the download URL
    starsRef.getDownloadURL().then(function(url) {
      console.log(url);
      return url;
    });
    //console.log(url);
    //return result;
  }

  public guardarImagenByte(imageRNC: Image) {
    let body = JSON.stringify(imageRNC);
    let headers = new Headers({
      "Content-Type": "application/json; charset=utf-8"
    });
    return this.http.post(this.imagenUrl, body, { headers }).pipe(
      map(res => {
        return res.json();
      })
    );
  }
}
