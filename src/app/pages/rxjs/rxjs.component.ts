import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent implements OnInit, OnDestroy {

subcription: Subscription;

  constructor() {
    

    this.subcription = this.retornarObservable().pipe(
      retry(2)
      )
      .subscribe(
      numero => console.log( 'Subs', numero),
      error => console.error( 'Error en el obs', error),
      () => console.log( 'El Observador Termino!' )
    );

   }

  ngOnInit() {
  }

  ngOnDestroy( ) {
this.subcription.unsubscribe();
  }

  retornarObservable (): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      let interval = setInterval( () => {
        contador ++;
        const salida = {
          valor: contador
        };
        observer.next( salida );
        /* if (contador === 3) {
          clearInterval(interval);
          observer.complete();
        } */
        /* if ( contador === 2) {
          clearInterval(interval);
          observer.error('Auxilio');
        } */
      }, 1000);
    }).pipe(
      map( resp => resp.valor ),
      filter( (valor, index) => {
        if ( (valor % 2) === 1) {
          return true;
        } else {
          return false;
        }
        
      })
    );
  }

}
