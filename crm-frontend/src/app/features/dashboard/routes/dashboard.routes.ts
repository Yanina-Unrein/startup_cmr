import { Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard';
import { MessagesPageComponent } from '../pages/messages-page/messages-page.component/messages-page.component';
export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'messages',
        component: MessagesPageComponent,
      },
      {
        path: 'messages/:contactId',
        component: MessagesPageComponent,
      },

      // Default → redirige a messages
      {
        path: '',
        redirectTo: 'messages',
        pathMatch: 'full'
      }
    ]
  }
];
export default dashboardRoutes;
