export interface RegistroNoConformidad {
    Nro?           : string,
    Descripcion?    : string, 
    Estatus?        : string,
    TipoReporte?    : string,
    EjecutorDanio?  : string, 
    Area?           : string, 
    Defecto?        : string, 
    NombreOriginador?: string,
    HHTrabajo?      : number,
    TratamientoNoConformidad?: string
    FechaEmision?   : Date,
    CodigoProyecto? : string,
    Observaciones?  : string
}
