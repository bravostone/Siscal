import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Fotos } from '../../../interfaces/procesos/registroNoConformidad/registro-no-conformidad';

@Injectable({
  providedIn: 'root'
})
export class FotosNoConformidadService {
  constructor(private http: Http) {}

  InsertURL: string =
    'http://aplicativostest.gym.com.pe/APISiscalDemo/v1/Imagen/AgregarFotos';
  ObtenerURL: string =
    'http://aplicativostest.gym.com.pe/APISiscalDemo/v1/Imagen/ObtenerFotos?codigoRnc=dotnet';
  DeleteURL: string =
    'http://aplicativostest.gym.com.pe/APISiscalDemo/v1/Imagen/EliminarFotos?codigoRnc=dotnet';

  ObtenerFotoPorCodigoRNC(codigoRnc: string) {
    const body = JSON.stringify(codigoRnc);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.ObtenerURL, body, { headers }).map(res => {
      return res.json();
    });
  }

  InsertarFotos(_listaFotos: Fotos[]) {
    const body = JSON.stringify(_listaFotos);
    const headers = new Headers({
      'Content-Type': 'application/json'// ,
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });
    return this.http.post(this.InsertURL, body, { headers }).map(res => {
      debugger;
      return res.json();
    });
    //return this.http.post(this.InsertURL, body);
  }
}
