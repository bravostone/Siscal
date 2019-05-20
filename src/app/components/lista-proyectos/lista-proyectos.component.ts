import { Component, OnInit } from '@angular/core';
import {ListaProyectosService} from '../../services/listaProyectos/lista-proyectos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.sass']
})
export class ListaProyectosComponent implements OnInit {
  listaProyecto: Array<any>;
  usuario : [];

  constructor( 
      private lista: ListaProyectosService,
      private router: Router,
  ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('objUsuario'));
    console.log(this.usuario);
    this.getListaProyecto();
  }

  getListaProyecto(){
    this.lista.getProyectos().then(result => {
      this.listaProyecto = result;
      console.log(this.listaProyecto)
    })
  }

  chooseProject(codigoProyecto: string){
    this.router.navigate(['/listado-rnc', codigoProyecto]);
  }

}
