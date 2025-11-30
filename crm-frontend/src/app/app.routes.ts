import { Routes } from '@angular/router';
import { PublicLayout } from './shared/layouts/public-layout/public-layout';
import { MainLayout } from './shared/layouts/main-layout/main-layout';

/**
 * RUTAS PRINCIPALES DEL CRM
 * --------------------------
 * - PublicLayout  → login, registro, recuperación
 * - MainLayout    → dashboard, contactos, mensajes, etc.
 *
 * NOTA:
 *   Por ahora se dejan SIN GUARD para permitir acceso sin login.
 *   Los guards quedan preparados abajo, comentados.
 */

export const routes: Routes = [
  /**
   * Rutas públicas (Auth): login, registro, recuperar contraseña.
   */
  {
    path: '',
    component: PublicLayout,
    loadChildren: () =>
      import('./features/auth/routes/auth.routes'),
    // ⭐ Cuando quieras activar la protección:
    // canActivate: [PublicGuard]
  },

  /**
   * Rutas privadas (dashboard y módulos internos del CRM)
   */
  {
    path: 'dashboard',
    component: MainLayout,
    loadChildren: () =>
      import('./features/dashboard/routes/dashboard.routes'),
    // ⭐ Cuando quieras activar la protección:
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard]
  },

  /**
   * Redirección para cualquier ruta no encontrada
   */
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

