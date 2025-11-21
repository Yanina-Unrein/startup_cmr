import { Routes } from '@angular/router';
import { PublicLayout } from './shared/layouts/public-layout/public-layout';
import { MainLayout } from './shared/layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path:'',
    component:PublicLayout,
    loadChildren: ()=>import('./features/auth/routes/auth.routes')
  },
  {
    path:'dashboard',
    component:MainLayout,
    loadChildren: ()=> import('./features/dashboard/routes/dashboard.routes')
  },
  {
    path:'**',
    redirectTo:'',
    pathMatch:'full'
  }
];
