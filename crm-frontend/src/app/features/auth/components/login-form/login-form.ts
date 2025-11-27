import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login-form',
  imports: [
     CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  @Input() errorMessage = ''; // Error del servidor
  @Input() isLoading = false;
  @Output() login = new EventEmitter<{ email: string; password: string }>();

  private fb = inject(FormBuilder);

  hidePassword = true;

  form = this.fb.group({
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required]),
  });

  get emailControl() {
    return this.form.get('email');
  }

  get passwordControl() {
    return this.form.get('password');
  }

  get showEmailRequiredError() {
    const email = this.emailControl;
    return email?.touched && email?.hasError('required');
  }

  get showEmailInvalidError() {
    const email = this.emailControl;
    return email?.touched && email?.hasError('email') && !email?.hasError('required');
  }

  get showPasswordRequiredError() {
    const password = this.passwordControl;
    return password?.touched && password?.hasError('required');
  }

  submitForm() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.login.emit({ email, password });
  }
}