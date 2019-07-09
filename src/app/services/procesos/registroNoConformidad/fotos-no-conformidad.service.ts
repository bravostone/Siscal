import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Fotos } from '../../../interfaces/procesos/registroNoConformidad/registro-no-conformidad';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FotosNoConformidadService {
  constructor(private http: HttpClient) {}

  InsertURL: string =
    'http://aplicativostest.gym.com.pe/APISiscalDemo/v1/Imagen/AgregarFotos';
  ObtenerURL: string =
    'http://aplicativostest.gym.com.pe/APISiscalDemo/v1/Imagen/ObtenerFotos?codigoRnc=';
  DeleteURL: string =
    'http://aplicativostest.gym.com.pe/APISiscalDemo/v1/Imagen/EliminarFotos?codigoRnc=dotnet';

  // ObtenerFotoPorCodigoRNC(codigoRnc: string) {
  //   return this.http.get(this.ObtenerURL + codigoRnc);
  // }

  ObtenerFotoPorCodigoRNC(codigoRnc: string , mapper): Observable<any> {
    return this.http.get<any>(this.ObtenerURL + codigoRnc, { headers: this.getHeaders() })
        .pipe(
        retry(3),
        catchError(this.handleError.bind(this)),
        map(mapper)
    );
}

  InsertarFotos(listaFotos: Fotos[]) {
    const body = JSON.stringify(listaFotos);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.InsertURL, body, { headers }).map(res => {
      return res;
    });
  }

  private getHeaders(): HttpHeaders {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json')
        .append('Authorization', '');
    return header;
 }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
        const json = error.error;
        console.log(json.Mensaje);
    } else {
       console.log('Ocurrió un error, comuníquese con el Administrados de Sistemas');
    }
    return throwError(error);
  }
}
