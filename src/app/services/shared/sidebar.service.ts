import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menus: any = [{
    titulo: 'Principal',
    icono: 'mdi mdi-gauge',
    subMenu: [
      { titulo: 'Dashboard', url: '/dashboard' },
      { titulo: 'ProgressBar', url: '/progress' },
      { titulo: 'Graficas', url: '/graficas1' },
      { titulo: 'Promesas', url: '/promesas' },
      { titulo: 'RXJS', url: '/rxjs' }
    ]
  }];

  constructor() { }
}
