import { CommonModule } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-sign-in',
  imports: [ FormsModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup

  showPassword:boolean = false

  constructor(private fb: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)]
      ]
    })
  }

  setShowPassword() {
    this.showPassword = !this.showPassword
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      return
    }
    const credential = this.signInForm.value

    this.authService.signIn(credential)
  }

  get email() {
    return this.signInForm.get('email')
  }
  get password() {
    return this.signInForm.get('password')
  }
}
