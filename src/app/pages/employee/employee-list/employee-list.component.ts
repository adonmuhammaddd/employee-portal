import { Component, OnInit } from '@angular/core';
import { Employee } from "../../../models/employee.model";
import { EmployeeService } from "../../../services/employee.service";

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = []

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees()
  }

  loadEmployees(): void {
    this.employees = this.employeeService.getEmployees()
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id)
    this.loadEmployees()
  }
}
