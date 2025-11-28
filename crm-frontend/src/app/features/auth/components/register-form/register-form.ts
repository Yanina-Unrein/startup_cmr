import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register-form',
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
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  @Input() errorMessage = '';
  @Input() isLoading = false;
  @Output() register = new EventEmitter<any>();

  private fb = inject(FormBuilder);

  hidePassword = true;

  form = this.fb.group({
    nombre: this.fb.nonNullable.control('', [Validators.required]),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required]),
    empresaId: this.fb.nonNullable.control('', [Validators.required]),
    tipoUsuario: this.fb.nonNullable.control('', [Validators.required]),
  });

  get nombreControl() { return this.form.get('nombre'); }
  get emailControl() { return this.form.get('email'); }
  get passwordControl() { return this.form.get('password'); }
  get empresaControl() { return this.form.get('empresaId'); }
  get tipoControl() { return this.form.get('tipoUsuario'); }

  get showNombreRequiredError() { return this.nombreControl?.touched && this.nombreControl?.hasError('required'); }
  get showEmailRequiredError() { return this.emailControl?.touched && this.emailControl?.hasError('required'); }
  get showEmailInvalidError() {
    const email = this.emailControl;
    return email?.touched && email?.hasError('email') && !email?.hasError('required');
  }
  get showPasswordRequiredError() { return this.passwordControl?.touched && this.passwordControl?.hasError('required'); }
  get showEmpresaRequiredError() { return this.empresaControl?.touched && this.empresaControl?.hasError('required'); }
  get showTipoUsuarioRequiredError() { return this.tipoControl?.touched && this.tipoControl?.hasError('required'); }

  submitForm() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
      return;
    }

    this.register.emit(this.form.getRawValue());
  }
}

