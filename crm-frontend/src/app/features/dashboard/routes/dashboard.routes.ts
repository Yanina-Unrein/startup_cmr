import { Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard';

// import { authGuard } from '@/app/core/guards/auth.guard'; // desactivado

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../pages/dashboard-home/dashboard-home')
            .then(m => m.DashboardHome), 
      },
     
       {
      path: 'contacts',
      loadChildren: () =>
        import('../../contacts/routes/contact.routes')
          .then(m => m.default),
    },
 //     {
   //     path: 'messages/:contactId',
     //   loadComponent: () =>
       //   import('../pages/messages-page/messages-page.component/messages-page.component')
         //   .then(m => m.MessagesPageComponent),
      //}
    ]
  }
];

export default dashboardRoutes;

