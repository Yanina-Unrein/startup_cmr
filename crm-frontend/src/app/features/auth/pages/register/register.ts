import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export default class Register {

  private readonly fb = inject(FormBuilder)

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    empresaId: ['', [Validators.required]],
    tipoUsuario: ['', [Validators.required]]
  });


  onRegister(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsDirty()
      this.registerForm.markAllAsTouched()
    }
  }
}
