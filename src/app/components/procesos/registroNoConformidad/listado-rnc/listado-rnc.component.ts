import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';

import { RegistroNoConformidad } from '../../../../interfaces/procesos/registroNoConformidad/registro-no-conformidad';
import { RegistroNoConformidadService } from '../../../../services/procesos/registroNoConformidad/registro-no-conformidad.service';

import {ImagenNoConformidadService} from '../../../../services/procesos/registroNoConformidad/imagen-no-conformidad.service'


@Component({
  selector: 'app-listado-rnc',
  templateUrl: './listado-rnc.component.html',
  styleUrls: ['./listado-rnc.component.sass']
})

export class ListadoRncComponent implements OnInit {

  rncModel : RegistroNoConformidad = {};
  constructor(
              private  service: RegistroNoConformidadService, 
              private  activate_route:ActivatedRoute, 
              private  router: Router,
              private  serviceImage: ImagenNoConformidadService
              ) {}

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Nro','Estatus','TipoReporte','Defecto','actions'];
  // displayedColumns: string[] = ['Nro','Descripcion','Estatus','TipoReporte','EjecutorDanio','Area','Defecto','NombreOriginador','HHTrabajo','TratamientoNoConformidad','actions'];
  //,'FechaEmision'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey: string = "";
  
  ngOnInit() {
    debugger;
    this.rncModel.CodigoProyecto = this.activate_route.snapshot.params["codigoProyecto"];
    this.service.getListado(this.rncModel).then(result => {
      let listaRnc = result.map(item => {
        return {
          $key: item.key,
          ...item.payload.doc.data()
        };
      });

      this.listData = new MatTableDataSource(listaRnc);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };
    });
  }
  
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  nuevoRnc(nroRnc: string = ""){
    this.router.navigate(['/formulario-rnc', this.rncModel.CodigoProyecto, nroRnc]);
  }
  // editarRNC(nroRnc: string = ""){
  //   debugger;
  //   let lista = this.serviceImage.descargarImagenStorage("29d3ae84-df7c-4e0d-8cfc-2026c44df7ad.jpg");

  //   if(lista !=  null)
  //   {
  //     debugger;
  //      var files = lista;
      
  //       for (var i = 0, f; f = files[i]; i++) {

  //        var reader = new FileReader();

  //        // Closure to capture the file information.
  //        reader.onload = (function(theFile) {
  //          return function(e) {
  //            // Render thumbnail.
  //            var span = document.createElement('span');
  //            span.innerHTML = ['<img style="width: 120px;" class="thumb" src="', e.target.result,
  //                              '" title="', escape(theFile.name), '"/>'].join('');

  //            document.getElementById('list').insertBefore(span, null);
  //          };
  //        })(f);

  //        // Read in the image file as a data URL.
  //        reader.readAsDataURL(f);
  //      }
  //   }

  // }
}