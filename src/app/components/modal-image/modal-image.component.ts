import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

import swal from 'sweetalert';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {

  public usuario: Usuario;
  public imgSubir: File;
  public imgTmp: string;

  constructor( public modalImagenService: ModalImagenService, public _usuarioService: UsuarioService) {
    this.usuario =  this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  cerrarModal() {
    this.imgTmp = null;
    this.modalImagenService.cerrarModal() ;
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
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( Archivo );

    reader.onloadend = () => this.imgTmp = reader.result.toString();
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imgSubir, this.usuario._id );
    this.modalImagenService.eventEmiterUpdateImg.emit( this.imgTmp );
    this.modalImagenService.cerrarModal() ;
  }

}
