import { Component, OnInit } from '@angular/core';
import { Employee } from "../../../models/employee.model";

@Component({
  selector: 'app-add-employee',
  imports: [],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  newEmployee!: Employee

  constructor(private) {}

  ngOnInit(): void {
    this.newEmployee = {
        id: 0,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        birthDate: new Date,
        basicSalary: 0,
        status: '',
        group: '',
        description: new Date
    }
  }

  saveEmployee(): void {

  }
}
