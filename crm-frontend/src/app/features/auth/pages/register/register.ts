import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterForm } from '../../components/register-form/register-form';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterForm,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export default class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  errorMessage = '';
  isLoading = false;

  onSubmit(data: any) {
    this.errorMessage = '';
    this.isLoading = true;

    this.auth.register(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error de registro:', err);

        if (err.status === 409) {
          this.errorMessage = 'El email ya está registrado';
        } else if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor';
        } else {
          this.errorMessage = err.error?.message ?? 'Error al registrarte. Intentá nuevamente.';
        }
      }
    });
  }
}
