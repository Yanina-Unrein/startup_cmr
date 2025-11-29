import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LogoTitle } from "@/app/shared/components/logo-title/logo-title";

@Component({
  selector: 'app-landing',
  imports: [CommonModule, MatButtonModule, MatIconModule, LogoTitle],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export default class Landing {
 constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
