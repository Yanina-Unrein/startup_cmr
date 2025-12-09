import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogoTitle } from "../logo-title/logo-title";

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
 isCollapsed = false;

   menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Contactos', icon: 'contacts', route: '/dashboard/contacts' },
    { label: 'Mensajes', icon: 'chat', route: '/dashboard/messages' },
    { label: 'Tareas', icon: 'task_alt', route: '/dashboard/tasks' },
    { label: 'Pipeline', icon: 'trending_up', route: '/dashboard/pipeline' },
    { label: 'Campañas', icon: 'campaign', route: '/dashboard/campaigns' },
    { label: 'Analíticas', icon: 'analytics', route: '/dashboard/analytics' },
    { label: 'Etiquetas', icon: 'label', route: '/dashboard/tags' },
    { label: 'Plantillas', icon: 'description', route: '/dashboard/templates' },
    { label: 'Configuración', icon: 'settings', route: '/dashboard/settings' }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
