import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterForm } from '../../components/register-form/register-form';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LogoTitle } from "@/app/shared/components/logo-title/logo-title";
import { Router, RouterLink } from '@angular/router';
import { RegisterUser } from '../../models/register-user';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ShowCustomMessage } from '../../../../shared/services/show-custom-message';

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
    MatIconModule,
    LogoTitle,
    MatSnackBarModule,
    RouterLink
],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export default class Register {

  private auth = inject(AuthService);
  private router = inject(Router);
  private readonly fb = inject(FormBuilder)
  private readonly showCustomMessage = inject(ShowCustomMessage)

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    empresaId: ['', [Validators.required]],
    tipoUsuario: ['', [Validators.required]]
  });

  errorMessage = '';
  isLoading = false;

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsDirty()
      this.registerForm.markAllAsTouched()
    }
  }

  onSubmit(data: RegisterUser) {
    this.errorMessage = '';
    this.isLoading = true;

    this.auth.register(data).subscribe({
      next: (r) => {
        this.showCustomMessage.showCustomMessage('Registro exitoso!')
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
