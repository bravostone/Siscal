import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { Fotos } from '../../../../interfaces/procesos/registroNoConformidad/registro-no-conformidad';
import { RegistroNoConformidadService } from '../../../../services/procesos/registroNoConformidad/registro-no-conformidad.service';
import { RegistroNoConformidad } from '../../../../interfaces/procesos/registroNoConformidad/registro-no-conformidad';
import { FotosNoConformidadService } from '../../../../services/procesos/registroNoConformidad/fotos-no-conformidad.service';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { FooterRowOutlet } from '@angular/cdk/table';
import { Foto } from 'src/app/interfaces/procesos/Fotos/Fotos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulario-rnc',
  templateUrl: './formulario-rnc.component.html',
  styleUrls: ['./formulario-rnc.component.sass'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class FormularioRncComponent implements OnInit {
  rncModel: RegistroNoConformidad = {};
  nuevo = false;
  ListaArea = [
    '-- No Describe --',
    'Almacen',
    'Calidad',
    'OT',
    'Produccion',
    'Ingenieria',
    'Procura',
    'PdR/GA',
    'Administracion',
    'Topografia',
    'Laboratorio'
  ];
  ListaDefecto = [
    'Abarquillado',
    'Accesorio Defectuoso',
    'Acero - defectos',
    'Acolchonamiento',
    'Albañilería sub estándar',
    'Almacenamiento subestándar',
    'Ausencia de Pase',
    'Bruñas - Falta/Mal ubicada/Incompleta/Mal acabada',
    'Cajoneo/Soplado',
    'Cangrejera'
  ];
  ListaStatus = ['Abierto', 'Anulado', 'Cerrado'];
  ListaNombreOriginador = [
    'Abner Delgado Gomez',
    'Abrahan Ochante Tineo',
    'Adan Huaman Canales',
    'Adbel Sierra Carhuamaca',
    'Adolfo Cordova Peña',
    'Adolfo Orrego Chumo',
    'Adrian Salinas Quispe',
    'Agustin Yoza Levano',
    'Aissa Zapata Reyes',
    'Akira Madueño Reynoso',
    'Alan Aldave',
    'Alan Espinoza',
    'Alberto Bermudez Monteyro'
  ];
  ListaTipoReporte = [
    { codigo: 'RNC', descripcion: 'No Conformidad' },
    { codigo: 'PNC', descripcion: 'Producto No Conforme' },
    { codigo: 'PL', descripcion: 'Punch List' },
    { codigo: 'ROB', descripcion: 'Reporte de Observaciones' }
  ];
  ListaTratamientoNoConformidad = [
    '-- No Describe --',
    'Modificar',
    'Rechazar',
    'Reclasificar',
    'Reparar',
    'Re-trabajo',
    'Usar como está'
  ];
  ListaEjecutorDanio = [
    'DISTRIBUIDORA PREMIUM S.A.',
    'EMPAQUETADURAS Y OPERACIONES E.I.R.LTDA.',
    'PROMETAL ROCA HERMANOS E.I.R.L.',
    'SOCIEDAD INDUSTRIAL VULCANO SRL',
    'SUMINISTROS FERMAR S.A.C.',
    '3D TOPOGRAFIA SOCIEDAD ANONIMA CERRADA - 3D TOPOGRAFIA S.A.C.',
    '3G OFFICE PERU S.A.C.',
    '3M PERU SA',
    '3P & CIA S.A.C',
    'A & A Edificaciones Generales S.A.',
    'A B SEGURIDAD E.I.R.L',
    'A Y A EDIFICACIONES S.A.C',
    'A.R Acabados Construcción EIRL',
    'AB7 S.A.C.'
  ];
  ListaFotos: Fotos[] = [];

  constructor(
    private service: RegistroNoConformidadService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private fotosService: FotosNoConformidadService,
    public datepipe: DatePipe,
    private adapter: DateAdapter<any>
  ) {}

  ngOnInit() {
    this.adapter.setLocale('es');
    this.rncModel.CodigoProyecto = this.activateRoute.snapshot.params['codigoProyecto'];
    this.rncModel.Nro = this.activateRoute.snapshot.params['codigoRNC'];

    // Si una edición
    if (this.rncModel.Nro !== '') {
      this.nuevo = false;
      this.service.getRegistro(this.rncModel).then(result => {
        this.rncModel = result[0].payload.doc.data();
        this.rncModel.Key = result[0].payload.doc._key.path.segments[6];
        this.rncModel.FechaEmision = result[0].payload.doc
          .data()
          .FechaEmision.toDate();

        this.ObtenerImagenes(this.rncModel.Key).subscribe(
          (resultado: any) => {
            console.log(resultado);
          // tslint:disable-next-line: only-arrow-functions
            resultado.forEach(function(element: Fotos) {
                const span = document.createElement('span');
                span.innerHTML = [
                  '<img style="width: 120px;" class="thumb" src="',
                  'data:image/' + element.ExtensionImagen + ';base64,' + element.Imagen,
                  '" title="',
                  element.NombreImagen,
                  '"/>'
                  ].join('');

                document.getElementById('list').insertBefore(span, null);
              });
          },
          (error) => {
            console.error(error);
          }
        );
      });
    } else {
      this.nuevo = true;
    }
  }

  Retornar() {
    this.router.navigate(['/listado-rnc', this.rncModel.CodigoProyecto]);
  }

  Grabar(rncModel) {
    if (this.ListaFotos.length === 0) {
      this.toastr.warning('Debe tener al menos una foto.', 'Advertencia');
      return;
    }

    if (rncModel.FechaEmision._d !== undefined) {
      // Esto pasa cuando la fecha carga pero no la modificas
      this.rncModel.FechaEmision = rncModel.FechaEmision._d;
    }

    if (this.nuevo) {
      this.rncModel.Nro =
      // tslint:disable-next-line: max-line-length
      this.rncModel.CodigoProyecto + ' - ' + this.rncModel.TipoReporte + ' - ' + this.rncModel.NombreOriginador + ' - ' + this.rncModel.HHTrabajo;
      // Llamamos al método guardar.
      this.service.createRNC(this.rncModel).then(result => {
        console.log(result);
        // tslint:disable-next-line: only-arrow-functions
        this.ListaFotos.forEach(function(element) {
          element.CodigoRnc = result.id;
        });

        this.fotosService.InsertarFotos(this.ListaFotos).subscribe(data => {
        });

        this.toastr.success('Registro creado exitosamente', 'Mantenimiento exitoso.');
        this.router.navigate(['/listado-rnc', this.rncModel.CodigoProyecto]);
      });
    } else {
      this.service.editRNC(this.rncModel).then(result => {
        const key = this.rncModel.Key;
        // tslint:disable-next-line: only-arrow-functions
        this.ListaFotos.forEach(function(element) {
          element.CodigoRnc = key;
        });

        this.fotosService.InsertarFotos(this.ListaFotos).subscribe(data => {
        });

        this.toastr.success('Registro modificado exitosamente', 'Mantenimiento exitoso.');
        this.router.navigate(['/listado-rnc', this.rncModel.CodigoProyecto]);
      });
    }
  }

  SeleccionarImagen(event) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      const objFotos: Fotos = {};
      objFotos.ExtensionImagen = files[0].type.split('/')[1];
      objFotos.NombreImagen = files[0].name.split('.' + objFotos.ExtensionImagen)[0];

      for (let i = 0, f; (f = files[i]); i++) {
        // Only process image files.
        if (!f.type.match('image.*')) {
          continue;
        }
        const reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
          return function(e) {
            // Render thumbnail.
            const span = document.createElement('span');
            objFotos.Imagen = e.target.result.split('base64,')[1];
            span.innerHTML = [
              '<img style="width: 120px;" class="thumb" src="',
              e.target.result,
              '" title="',
              escape(theFile.name),
              '"/>'
            ].join('');

            document.getElementById('list').insertBefore(span, null);
          };
        })(f);
        this.ListaFotos.push(objFotos);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
      }
    }
  }

  ObtenerImagenes(codigoRNC: string): Observable<Foto> {
    return this.fotosService.ObtenerFotoPorCodigoRNC(this.rncModel.Key, Foto.fromAnyListUsuario);
  }
}
