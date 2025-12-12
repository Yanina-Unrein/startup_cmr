import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // authService.isLogged es un computed signal que devuelve true/false
  if (authService.isLogged()) return true;

  // Redirigir al login si no está logueado
  router.navigate(['/login']);
  return false;
};