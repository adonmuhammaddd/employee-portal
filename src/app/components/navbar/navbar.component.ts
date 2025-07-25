import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [ CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userProfileImgUrl = 'images/swan.gif'

  isDropdownOpen: boolean = false

  constructor() {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen
  }
}
