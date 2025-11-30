import { Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard';

// import { authGuard } from '@/app/core/guards/auth.guard'; // desactivado

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      /**
       * RUTA PRINCIPAL DEL DASHBOARD
       * /dashboard → pantalla de contactos + mensajes
       */
      {
        path: '',
        loadChildren: () =>
          import('../../contacts/routes/contact.routes')
            .then(m => m.default),
      },

      /**
       * MENSAJES (cuando el usuario selecciona un contacto)
       * /dashboard/messages/:contactId
       */
      {
        path: 'messages/:contactId',
        loadComponent: () =>
          import('../pages/messages-page/messages-page.component/messages-page.component')
            .then(m => m.MessagesPageComponent),
      }
    ]
  }
];

export default dashboardRoutes;

