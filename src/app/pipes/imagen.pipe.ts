import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: String = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';
    if ( !img ) {
      return url + '/usuario/xxx';
    }
    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
         url += '/usuario/' + img;
      break;
      case 'medico':
        url += '/medicos/' + img;
      break;
      case 'hospital':
        url += '/hospital/' + img;
      break;
      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usuario/xxx';
    }
    return url;
  }

}
