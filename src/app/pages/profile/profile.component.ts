import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imgSubir: File;
  imgTmp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario =  this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
        .subscribe( );
  }

  seleccionImagen( Archivo: File ) {
    if ( !Archivo ) {
      this.imgSubir = null;
      return;
    }

    if( Archivo.type.indexOf('image') < 0 ){
      swal('Solo imagenes', 'El Archivo seleccionado no es una imagen', 'error');
      this.imgSubir= null;
      return;
    }
    this.imgSubir = Archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( Archivo );

    reader.onloadend = () => this.imgTmp = reader.result;
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imgSubir, this.usuario._id );
  }

}
