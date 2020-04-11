import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  // este metodo reporta una promesa
  subirArchivo( archivo: File, tipo: string, id: string) {

    return new Promise( ( resolver, reject ) => {
      // toda el desarrollo es javascript puro
      let formData = new FormData();
      let xhr = new XMLHttpRequest(); // AJAX

      // el primer parametro es el nombre que se le pone 
      // en el body del servicio rest ver en el postman 
      // donde se va la imagen.
      formData.append( 'imagen', archivo, archivo.name );
      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            resolver( JSON.parse(xhr.response) ); // cuando salio ok
          } else {
            reject(JSON.parse( xhr.response )); // cuando dio algun error
          }
        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send( formData );

    } );
  }
}
