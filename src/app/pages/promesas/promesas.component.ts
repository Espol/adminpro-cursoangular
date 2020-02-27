import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      () => console.log('Temino')
    )
    .catch ( error => console.error('Error en la promessa', error) );

   }

  ngOnInit() {
  }

  contarTres() {
    let promesa = new Promise( (resolve, reject) => {
      let contador = 0;
      let itervalo = setInterval( () => {
        contador += 1;
        console.log(contador);
        if ( contador === 3 ) {
          resolve();
          clearInterval( itervalo );
        }
      }, 1000 );
    } );

    return promesa;
  }

}
