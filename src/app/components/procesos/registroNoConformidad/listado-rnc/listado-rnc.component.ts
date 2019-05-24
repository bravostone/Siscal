import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistroNoConformidadService } from '../../../../services/procesos/registroNoConformidad/registro-no-conformidad.service';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import { RegistroNoConformidad } from '../../../../interfaces/procesos/registroNoConformidad/registro-no-conformidad'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-rnc',
  templateUrl: './listado-rnc.component.html',
  styleUrls: ['./listado-rnc.component.sass']
})
export class ListadoRncComponent implements OnInit {
  rncModel : RegistroNoConformidad = {};
  constructor(private service: RegistroNoConformidadService, private _activate_route:ActivatedRoute, private router: Router) {
   }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Nro','Estatus','TipoReporte','Defecto','actions'];
  // displayedColumns: string[] = ['Nro','Descripcion','Estatus','TipoReporte','EjecutorDanio','Area','Defecto','NombreOriginador','HHTrabajo','TratamientoNoConformidad','actions'];
  //,'FechaEmision'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string = "";
  
  ngOnInit() {
    this.rncModel.CodigoProyecto = this._activate_route.snapshot.params["codigoProyecto"];
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
}
