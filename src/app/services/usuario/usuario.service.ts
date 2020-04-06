import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }
 
  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify( usuario ) );

    this.usuario =  usuario;
    this.token = token;
}

cargarStorage() {
  if ( localStorage.getItem('token')) {
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  } else {
    this.token = '';
    this.usuario = null;
  }

}

  loginGoogle( token: String ){
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token }).pipe(
      map( (resp: any ) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario ).pipe(
      map( ( resp: any ) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario);
        // localStorage.setItem('id', resp.id );
        // localStorage.setItem('token', resp.token );
        // localStorage.setItem('usuario', JSON.stringify( resp.usuario ) );
        return true;
      })
    );

  }

  estaLogueado() {
    return (this.token.length > 0) ? true : false;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  crearUsuario( usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario ).pipe(
            map( ( resp: any ) => {
              swal('Usuario Creado', resp.usuario.email, 'success');
              return resp.usuario;
            }));
  }
}
