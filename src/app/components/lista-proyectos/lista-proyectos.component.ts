import { Component, OnInit } from '@angular/core';
// import { Observable }           from 'rxjs';
// import { map }                  from 'rxjs/operators';
// import { ActivatedRoute }       from '@angular/router';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.sass']
})
export class ListaProyectosComponent implements OnInit {
  Mensaje : string;
  Usuario : [];
  constructor() { }

  ngOnInit() {
    this.Usuario = JSON.parse(localStorage.getItem('objUsuario'));
    //this.Mensaje = this.Usuario.NombreCompleto;
    console.log(this.Usuario);
  }

}
