import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from "./components/alert/alert.component";
import { GlobalService } from "./services/global.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employee-portal';

  constructor(public globalService: GlobalService) {}
}
