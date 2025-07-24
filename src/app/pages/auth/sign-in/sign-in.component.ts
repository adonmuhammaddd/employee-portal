import { CommonModule } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../../../components/alert/alert.component";

@Component({
  selector: 'app-sign-in',
  imports: [ FormsModule, ReactiveFormsModule, CommonModule, AlertComponent ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup

  showPassword:boolean = false

  creds = {
    email: 'don.dev.exe@gmail.com',
    password: 'passw0rd'
  }

  alertTitle!: string
  alertMessage!: string
  alertVariant!: string
  alertDuration!: number
  alertShow: boolean = false

  constructor(private fb: FormBuilder){}

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

    const { email, password } = this.signInForm.value

    if (email === this.creds.email && password === this.creds.password) {
      console.log('EMAIL ======> ', email)
      console.log('password ======> ', password)
      this.alertTitle = 'success'
      this.alertVariant = 'success'
      this.alertDuration = 3000
      this.alertMessage = 'success login'
      this.alertShow = true
    } else {

      this.alertTitle = 'error'
      this.alertVariant = 'error'
      this.alertDuration = 3000
      this.alertMessage = 'email or password invalid'
      this.alertShow = true
    }

  }

  get email() {
    return this.signInForm.get('email')
  }
  get password() {
    return this.signInForm.get('password')
  }
}
