import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  imports: [ CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userProfileImgUrl = 'images/swan.gif'

  isDropdownOpen: boolean = false

  constructor(private authService: AuthService) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  signOut() {
    this.authService.signOut()
  }
}
