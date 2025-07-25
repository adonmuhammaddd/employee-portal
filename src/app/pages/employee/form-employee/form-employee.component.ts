import { Component, Input, OnInit } from '@angular/core';
import { Employee } from "../../../models/employee.model";
import { EmployeeService } from "../../../services/employee.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { GlobalService } from "../../../services/global.service";

@Component({
  selector: 'app-form-employee',
  imports: [FormsModule],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.css'
})
export class FormEmployeeComponent implements OnInit {

  @Input() employee: Employee = {
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
  isEditing: boolean = false

  constructor(
    private employeeService: EmployeeService,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id')
    if (employeeId) {
      this.isEditing = true
      const employees = this.employeeService.getEmployees()
      const existingEmployee = employees.find(employee => employee.id === Number(employeeId))
      if (existingEmployee) {
        this.employee = { ...existingEmployee }
      }
    }
  }

  saveEmployee(): void {
    this.globalService.alertTitle = 'success'
    this.globalService.alertVariant = 'success'
    this.globalService.alertDuration = 3000
    if(this.isEditing) {
      this.employeeService.updateEmployee(this.employee)
      this.globalService.alertMessage = 'success update employee '+this.employee.firstName
    } else {
      this.employeeService.addEmployee(this.employee)
      this.globalService.alertMessage = 'success add employee '+this.employee.firstName
    }
    this.globalService.alertShow = true
    this.router.navigate(['/employee/list'])
  }

  resetEmployeeForm() {
    this.employee = {
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
}
