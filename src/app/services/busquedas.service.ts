import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from './../models/usuario.model';

const base_url  = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http  : HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios( resultados: any ): Usuario[] {
    console.log(resultados);
    return resultados.usuarios.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.role, user.google, user.uid) );

  }

  buscar(tipo: 'usuarios'|'medicos'|'hospitales',
  termino: string) {
    const url = `${ base_url }/busqueda/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url ).pipe(
      map ( (resp: any) => {

        switch ( tipo ) {
          case 'usuarios':
            return this.transformarUsuarios( resp );
            default:
              return [];
        }
      } )
    );
  }
}
