import { Routes } from '@angular/router';
import { authGuard } from '@/app/core/guards/auth.guard';

const contactRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../components/contact-list/contact-list').then(m => m.ContactList),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('../components/contact-form/contact-form').then(m => m.ContactForm),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('../components/contact-form/contact-form').then(m => m.ContactForm),
      }
    ]
  }
];

export default contactRoutes;

