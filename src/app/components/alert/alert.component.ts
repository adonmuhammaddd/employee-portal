import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [ CommonModule ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {

  @Input() variant!: string
  @Input() title!: string
  @Input() message!: string
  @Input() duration: number = 0
  @Input() show: boolean = false

  visible: boolean = true

  success = 'fixed top-4 right-4 z-9999999999 animate-fade-in border-green-500 bg-green-50'
  error = 'fixed top-4 right-4 z-9999999999 animate-fade-in border-red-500 bg-red-50'

  constructor() {}


  ngOnInit(): void {

    if (this.duration) {
      setTimeout(() => {
        this.visible = false
      }, this.duration)
    }
  }

}
