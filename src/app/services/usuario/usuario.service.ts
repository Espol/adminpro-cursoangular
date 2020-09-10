import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  get _id(): string {
    return this.usuario._id || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
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

  loginGoogle( token: String ) {
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

  actualizarUsuario( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    return this.http.put( url, usuario ).pipe(
      map( (resp: any) => {
        const userDB: Usuario = resp.usuario;
        this.guardarStorage( userDB._id, this.token, userDB);
        swal('Usuario Actualizado', usuario.nombre, 'success' );
        return true;
      })
    );
  }

  cambiarImagen( file: File, id: string ) {
    this._subirArchivoService.subirArchivo( file, 'usuarios', id)
    .then( (resp: any) => {
      this.usuario.img = resp.usuario.img;
      this.guardarStorage( id, this.token, this.usuario);
      swal('Imagen Actualizada', this.usuario.nombre, 'success');
    } ).catch( (resp: any) => {console.log(resp); } );
  }

  cargarUsuarios( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url ).pipe(
      map( (resp: any) => {
        const usuarios = resp.usuarios.map(
          user => new Usuario(user.nombre, user.email, '', user.img, user.role, user.google, user._id) );
        return {
          total: resp.total,
          usuarios : usuarios
        };
      })
    );

  }

  eliminarUsuario ( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    return this.http.delete( url );
  }
}
