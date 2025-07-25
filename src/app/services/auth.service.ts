import { Injectable } from '@angular/core';
import { GlobalService } from "./global.service";
import { Router } from "@angular/router";

interface UserInfo {
  email: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  creds = {
    email: 'don.dev.exe@gmail.com',
    password: 'passw0rd'
  }
  userInfo = {
    email: 'don.dev.exe@gmail.com',
    name: 'Don'
  }

  user: UserInfo = { email: '', name: ''}

  alertTitle!: string
  alertMessage!: string
  alertVariant!: string
  alertDuration!: number

  constructor(private globalService: GlobalService, private router: Router) { }

  signIn(creds: any) {
    const { email, password } = creds
    if (email === this.creds.email && password === this.creds.password) {
      console.log('EMAIL ======> ', email)
      console.log('password ======> ', password)
      this.globalService.alertTitle = 'success'
      this.globalService.alertVariant = 'success'
      this.globalService.alertMessage = 'success login'
      localStorage.setItem('user', JSON.stringify(this.userInfo))
      this.router.navigate(['/employee'])
    } else {
      this.globalService.alertTitle = 'error'
      this.globalService.alertVariant = 'error'
      this.globalService.alertMessage = 'email or password invalid'
    }
    this.globalService.alertDuration = 3000
    this.globalService.showAlert()
  }

  signOut() {
    localStorage.removeItem('user')
    this.router.navigate(['/auth'])
  }

  isAuthenticated() {
    const loggedUser = localStorage.getItem('user')
    if (!loggedUser) {
      return false
    }

    return true
  }

  getUser() {
    const loggedUser = localStorage.getItem('user')
    if (loggedUser) {
      const { email, name } = JSON.parse(loggedUser)
      this.user.email = email
      this.user.name = name
    }
  }
}
