import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../components/login-form/login-form';
import { LogoTitle } from "@/app/shared/components/logo-title/logo-title";



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LoginForm,
    LogoTitle
],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {
   private auth = inject(AuthService);
  private router = inject(Router);

  errorMessage = '';
  isLoading = false;

  onSubmit(credentials: { email: string; password: string }) {
    this.errorMessage = ''; // Limpiar error previo
    this.isLoading = true;

    this.auth.login(credentials.email, credentials.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error de login:', err);
        
        if (err.status === 401) {
          this.errorMessage = 'El email o la contraseña son inválidos';
        } else if (err.status === 404) {
          this.errorMessage = 'El email o la contraseña son inválidos';
        } else if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor';
        } else {
          this.errorMessage = err.error?.message ?? 'Error al iniciar sesión. Intentá nuevamente.';
        }
      },
    });
  }
}

