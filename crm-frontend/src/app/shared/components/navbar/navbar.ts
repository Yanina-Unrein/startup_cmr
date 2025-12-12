import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogoTitle } from "../logo-title/logo-title";
import { AuthService } from '@/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatTooltipModule,
    LogoTitle
],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  auth = inject(AuthService);
  router = inject(Router);

  isCollapsed = false;

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard', exact: true },
    { label: 'Contactos', icon: 'contacts', route: '/dashboard/contacts' },
    { label: 'Emails', icon: 'email', route: '/dashboard/email/compose' },
    { label: 'Mensajes', icon: 'chat', route: '/dashboard/messages' },
    // { label: 'Pipeline', icon: 'trending_up', route: '/dashboard/pipeline' },
    // { label: 'Campañas', icon: 'campaign', route: '/dashboard/campaigns' },
    { label: 'Analíticas', icon: 'analytics', route: '/dashboard/analytics' },
    // { label: 'Etiquetas', icon: 'label', route: '/dashboard/tags' },
    { label: 'Plantillas', icon: 'description', route: '/dashboard/email/templates' },
    { label: 'Configuración', icon: 'settings', route: '/dashboard/settings' }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
