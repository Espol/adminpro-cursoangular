import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  progresoAzul: number = 20;
  progresoVerde: number = 30;

  constructor() { }

  ngOnInit() {
  }

  actualizarAzul ( event: number ) {
    this.progresoAzul = event;
  }
}
