import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Header } from "@/app/layout/header/header";
import { Navbar } from "@/app/shared/components/navbar/navbar";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  standalone: true,
  imports: [Header, Navbar
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  private router = inject(Router);

  goToContacts() {
    this.router.navigate(['/dashboard/contacts']);
  }

}
