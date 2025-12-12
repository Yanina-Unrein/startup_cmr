import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Navbar } from "@/app/shared/components/navbar/navbar";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    Navbar,
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
