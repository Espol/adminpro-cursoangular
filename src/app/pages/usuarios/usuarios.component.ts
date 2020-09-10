import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { BusquedasService } from '../../services/busquedas.service';

import swal from 'sweetalert';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public imgSubs: Subscription;
  usuarios: Usuario[] = [];
  usuariosTmp: Usuario[] = [];
  desde: number = 0;

  totalRegistro: number = 0;

  public cargando: boolean  =  true;

  constructor(public _usuarioService: UsuarioService,
              private busquedasServices: BusquedasService,
              private _modalImagenServices: ModalImagenService ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit() {
    this.cargarUsuario();

    this.imgSubs = this._modalImagenServices.eventEmiterUpdateImg
    .subscribe( img => {
      this.cargarUsuario();
    });
  }

  cargarUsuario() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
      .subscribe( (resp: any) => {
        this.totalRegistro = resp.total;
        this.usuarios = resp.usuarios;
        this.usuariosTmp = resp.usuarios;
        this.cargando = false;
      }
    );
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    if ( desde >= this.totalRegistro) {
      return;
    }
    if ( desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuario();
  }

  buscar(termino: string ) {
    if ( termino.length > 0 ) {
      this.busquedasServices.buscar('usuarios', termino)
    .subscribe( resp => this.usuarios = resp );
    } else {
      return this.usuarios = this.usuariosTmp;
    }
  }

  eliminarUsuario( usuario: Usuario )  {
    if ( usuario._id === this._usuarioService._id) {
      return swal('Error', 'No se puede Eliminar el mismo usuario logueado', 'info');
    }
    swal({
      title: '¿Boorar Usuario?',
      text: 'Esta a punto de borrar a ' + usuario.nombre ,
      icon: 'warning',
      buttons: ['Cancel', 'Ok'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._usuarioService.eliminarUsuario( usuario )
        .subscribe( resp => {
            this.cargarUsuario();
            swal(usuario.nombre + ' Eliminado correctamente', {
              icon: 'success',
            });
          });
      }
    });
  }

  cambiarRole ( usuario: Usuario ) {

    this._usuarioService.actualizarUsuario( usuario )
    .subscribe( resp => {
      console.log(resp);
    });
  }

  abrirModal( usuario: Usuario) {
    console.log(usuario);
    this._modalImagenServices.abrirModal( 'usuarios', usuario._id, usuario.img );
  }

}
