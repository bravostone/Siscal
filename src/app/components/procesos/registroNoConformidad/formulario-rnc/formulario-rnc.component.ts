import { Component, OnInit, ViewChild } from "@angular/core";
import { RegistroNoConformidadService } from "../../../../services/procesos/registroNoConformidad/registro-no-conformidad.service";
import { MatTableDataSource, MatSort, MatPaginator, MatButton } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { RegistroNoConformidad } from "../../../../interfaces/procesos/registroNoConformidad/registro-no-conformidad";

@Component({
  selector: "app-formulario-rnc",
  templateUrl: "./formulario-rnc.component.html",
  styleUrls: ["./formulario-rnc.component.sass"]
})
export class FormularioRncComponent implements OnInit {
  rncModel: RegistroNoConformidad = {};

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
  ListaStatus = [
    "Abierto", 
    "Anulado", 
    "Cerrado"];
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
    "No Conformidad",
    "Producto No Conforme",
    "Punch List",
    "Reporte de Observaciones"
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
    private _activate_route: ActivatedRoute
  ) {}

  ngOnInit() {}

  Grabar(){
    debugger;
    console.log(this.rncModel);
  }
}
