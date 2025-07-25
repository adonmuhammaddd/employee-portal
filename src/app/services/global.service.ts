import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  alertTitle!: string
  alertMessage!: string
  alertVariant!: string
  alertDuration!: number
  alertShow: boolean = false

  constructor() { }

  showAlert() {
    this.alertShow = !this.alertShow
    setTimeout(() => {
      this.alertShow = !this.alertShow
    }, this.alertDuration)
  }
}
