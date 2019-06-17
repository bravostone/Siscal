import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

import { RegistroNoConformidadService } from "../../../../services/procesos/registroNoConformidad/registro-no-conformidad.service";
import { RegistroNoConformidad } from "../../../../interfaces/procesos/registroNoConformidad/registro-no-conformidad";
import {ImagenNoConformidadService} from '../../../../services/procesos/registroNoConformidad/imagen-no-conformidad.service'

@Component({
  selector: "app-formulario-rnc",
  templateUrl: "./formulario-rnc.component.html",
  styleUrls: ["./formulario-rnc.component.sass"]
})
export class FormularioRncComponent implements OnInit {

  rncModel: RegistroNoConformidad = {};
  nuevo: boolean = false;
  ListaArea = [
    "-- No Describe --",
    "Almacen",
    "Calidad",
    "OT",
    "Produccion",
    "Ingenieria",
    "Procura",
    "PdR/GA",
    "Administracion",
    "Topografia",
    "Laboratorio"
  ];
  ListaDefecto = [
    "Abarquillado",
    "Accesorio Defectuoso",
    "Acero - defectos",
    "Acolchonamiento",
    "Albañilería sub estándar",
    "Almacenamiento subestándar",
    "Ausencia de Pase",
    "Bruñas - Falta/Mal ubicada/Incompleta/Mal acabada",
    "Cajoneo/Soplado",
    "Cangrejera"
  ];
  ListaStatus = ["Abierto", "Anulado", "Cerrado"];
  ListaNombreOriginador = [
    "Abner Delgado Gomez",
    "Abrahan Ochante Tineo",
    "Adan Huaman Canales",
    "Adbel Sierra Carhuamaca",
    "Adolfo Cordova Peña",
    "Adolfo Orrego Chumo",
    "Adrian Salinas Quispe",
    "Agustin Yoza Levano",
    "Aissa Zapata Reyes",
    "Akira Madueño Reynoso",
    "Alan Aldave",
    "Alan Espinoza",
    "Alberto Bermudez Monteyro"
  ];
  ListaTipoReporte = [
    { codigo: "RNC", descripcion: "No Conformidad" },
    { codigo: "PNC", descripcion: "Producto No Conforme" },
    { codigo: "PL", descripcion: "Punch List" },
    { codigo: "ROB", descripcion: "Reporte de Observaciones" }
  ];
  ListaTratamientoNoConformidad = [
    "-- No Describe --",
    "Modificar",
    "Rechazar",
    "Reclasificar",
    "Reparar",
    "Re-trabajo",
    "Usar como esta"
  ];
  ListaEjecutorDanio = [
    "DISTRIBUIDORA PREMIUM S.A.",
    "EMPAQUETADURAS Y OPERACIONES E.I.R.LTDA.",
    "PROMETAL ROCA HERMANOS E.I.R.L.",
    "SOCIEDAD INDUSTRIAL VULCANO SRL",
    "SUMINISTROS FERMAR S.A.C.",
    "3D TOPOGRAFIA SOCIEDAD ANONIMA CERRADA - 3D TOPOGRAFIA S.A.C.",
    "3G OFFICE PERU S.A.C.",
    "3M PERU SA",
    "3P & CIA S.A.C",
    "A & A Edificaciones Generales S.A.",
    "A B SEGURIDAD E.I.R.L",
    "A Y A EDIFICACIONES S.A.C",
    "A.R Acabados Construcción EIRL",
    "AB7 S.A.C."
  ];

  constructor(
    private service: RegistroNoConformidadService,
    private _activate_route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private firebaseStorage: ImagenNoConformidadService
  ) {}

  listImage : Array<any>;
  listURL   : Array<any>;

  ngOnInit() {

    this.rncModel.CodigoProyecto = this._activate_route.snapshot.params["codigoProyecto"];
    this.rncModel.Nro            = this._activate_route.snapshot.params["codigoRNC"];

    if (this.rncModel.Nro != "") {
        this.nuevo = false;
        this.service.getRegistro(this.rncModel).then(result => {
        this.rncModel = result[0].payload.doc.data();
        this.rncModel.Key = result[0].payload.doc._key.path.segments[6];
      });
      //TODO: Obtener registro de FStore
      //Pintar la info en la grilla
    } else {
      this.nuevo = true;
    }
  }

  Grabar(rncModel) {
     if (this.nuevo) {

       //Subimos las imagenes
      this.SubirImagen(this.listImage);
      //Seteamos número.
      this.rncModel.Nro = this.rncModel.CodigoProyecto + " - " + this.rncModel.TipoReporte + " - " + this.rncModel.NombreOriginador + " - " + this.rncModel.HHTrabajo;
      //Seteamos ListaImagenes.
      this.rncModel.ListaImagenes = this.listImage;
      //Llamamos al método guardar.
      this.service.createRNC(this.rncModel).then(result => {});
     }
     else {
      this.service.editRNC(this.rncModel).then(result => {});
     }

    this.toastr.success('Registro exitoso','Mantenimiento exitoso.');
    this.router.navigate(["/listado-rnc", this.rncModel.CodigoProyecto]);


  }

  onFileSelected(event) {

    if(event.target.files.length > 0)
     {
       debugger;
        var files = event.target.files;
        this.listImage = files;

         for (var i = 0, f; f = files[i]; i++) {

          // Only process image files.
          if (!f.type.match('image.*')) {
            continue;
          }
          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              var span = document.createElement('span');
              span.innerHTML = ['<img style="width: 120px;" class="thumb" src="', e.target.result,
                                '" title="', escape(theFile.name), '"/>'].join('');

              document.getElementById('list').insertBefore(span, null);
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
        }
     }
   }

   SubirImagen(listImage){
      for (let index = 0; index < listImage.length; index++) {
        this.firebaseStorage.subirImagenStorage(listImage[index].name, listImage[index]);
      }
   }

   DescargarImagen(listImage){
      for (let index = 0; index < listImage.length; index++) {
        var url = this.firebaseStorage.descargarImagenStorage(listImage[index].name);

        this.listURL.push(url);
        console.log(this.listURL);
      }
      debugger;
      console.log('url lista final:' + this.listURL);
      return this.listURL;
    
   }
}
