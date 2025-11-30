import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './contact-form.html',
})
export class ContactForm {
  @Input() contact: any;
  @Input() isLoading = false;
  @Output() save = new EventEmitter<any>();

  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
    email: this.fb.nonNullable.control('', [Validators.email]),
    phone: this.fb.nonNullable.control(''),
    whatsappPhone: this.fb.nonNullable.control(''),
    funnelStatus: this.fb.nonNullable.control('NEW', [Validators.required]),
  });

  ngOnInit() {
    if (this.contact) this.form.patchValue(this.contact);
  }

  get showNameError() { return this.form.get('name')?.touched && this.form.get('name')?.hasError('required'); }
  get showEmailRequiredError() { return this.form.get('email')?.touched && this.form.get('email')?.hasError('required'); }
  get showEmailInvalidError() { 
    const email = this.form.get('email'); 
    return email?.touched && email?.hasError('email') && !email?.hasError('required'); 
  }

  submitForm() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
      return;
    }
    this.save.emit(this.form.getRawValue());
  }
}