import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string ;
  recuedame: boolean = false;
  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
  }

  googleInit() {
    gapi.load( 'auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '93652956896-jq4e0ccd09bssnur81pufc97kmikheq5.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, ( googleUser ) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle( token ).subscribe( () => {
        this.router.navigate(['/dashboard']);
      }) ;
    } );
  }

  ingresar( form: NgForm ) {

    if( form.invalid) {return;}

    let usuario = new Usuario(null, form.value.email, form.value.password );

    this._usuarioService.login(usuario, this.recuedame)
    .subscribe( resp =>  this.router.navigate(['/dashboard']) );

    // this.router.navigate(['/dashboard']);

  }

}
