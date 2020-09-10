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
  },
  {
    titulo: 'Mantenimiento',
    icono: 'mdi mdi-folder-lock-open',
    subMenu: [
      { titulo: 'Usuarios', url: '/usuarios' },
      { titulo: 'Hospitales', url: '/hospitales' },
      { titulo: 'Medicos', url: '/medicos' }
    ]
  }
];

  constructor() { }
}
