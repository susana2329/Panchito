import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio';
import { MenuComponent } from './pages/menu/menu';
import { CrearComponent } from './pages/crear/crear';
import { EditarComponent } from './pages/editar/editar';

export const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'crear',
    component: CrearComponent
  },
  {
    path: 'editar/:id',
    component: EditarComponent
  },
];