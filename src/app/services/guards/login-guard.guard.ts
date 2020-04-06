import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService,
    public router: Router ) {

  }
  // tslint:disable-next-line:one-line
  canActivate( ){
    
    if( this._usuarioService.estaLogueado() ) {
      console.log('PASO EL GUARD');
      return true;
    } else {
      console.log('Bloqueado por Guard');
      this.router.navigate(['/login']);
      return false;
    }
    
  }
}
