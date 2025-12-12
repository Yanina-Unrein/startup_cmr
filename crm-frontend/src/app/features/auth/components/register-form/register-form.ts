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
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required]),
    fullName: this.fb.nonNullable.control('', [Validators.required]),
    companyId: this.fb.nonNullable.control('', [Validators.required]),
    typeUser: this.fb.nonNullable.control('', [Validators.required]),
  });

  get emailControl() { return this.form.get('email'); }
  get passwordControl() { return this.form.get('password'); }
  get fullNameControl() { return this.form.get('fullName'); }
  get companyControl() { return this.form.get('companyId'); }
  get typeUserControl() { return this.form.get('userType'); }

  
  get showEmailRequiredError() { return this.emailControl?.touched && this.emailControl?.hasError('required'); }
  get showEmailInvalidError() {
    const email = this.emailControl;
    return email?.touched && email?.hasError('email') && !email?.hasError('required');
  }
  get showPasswordRequiredError() { return this.passwordControl?.touched && this.passwordControl?.hasError('required'); }
  get showFullNameRequiredError() { return this.fullNameControl?.touched && this.fullNameControl?.hasError('required'); }
  get showCompanyRequiredError() { return this.companyControl?.touched && this.companyControl?.hasError('required'); }
  get showtypeUserRequiredError() { return this.typeUserControl?.touched && this.typeUserControl?.hasError('required'); }

  submitForm() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
      return;
    }

    this.register.emit(this.form.getRawValue());
  }
}

