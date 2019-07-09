export class Foto {
    CodigoRnc?: string;
    NombreImagen?: string;
    ExtensionImagen?: string;
    Imagen?: string;

    constructor(CodigoRnc: string, NombreImagen: string, ExtensionImagen: string, Imagen: string) {
      this.CodigoRnc       = CodigoRnc;
      this.NombreImagen    = NombreImagen;
      this.ExtensionImagen = ExtensionImagen;
      this.Imagen          = Imagen;
    }

    static fromAnyFoto(result: any): Foto {
      return new Foto(result.CodigoRnc, result.NombreImagen, result.ExtensionImagen, result.Imagen);
    }

    static fromAnyListUsuario(result: Array<any>): Array<Foto> {
      const list: Array<Foto> = [];
      for (const item of result) {
        list.push(Foto.fromAnyFoto(item));
      }
      return list;
    }
  }
