import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  hidePassword: boolean = true;

  // Credenciales hardcodeadas
  private readonly VALID_USERNAME = 'Admin';
  private readonly VALID_PASSWORD = 'Admin_123';

  constructor(private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (this.username === this.VALID_USERNAME && this.password === this.VALID_PASSWORD) {
      // Login exitoso
      console.log('Login exitoso');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', this.username);

      // Redirigir al dashboard o página principal
      this.router.navigate(['/dashboard']);
    } else {
      // Login fallido
      this.errorMessage = 'Usuario o contraseña incorrectos';
      this.password = '';
    }
  }
}

