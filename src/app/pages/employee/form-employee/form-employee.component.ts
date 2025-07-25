import { Component, Input, OnInit } from '@angular/core';
import { Employee } from "../../../models/employee.model";
import { EmployeeService } from "../../../services/employee.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { GlobalService } from "../../../services/global.service";
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { CommonModule } from "@angular/common";
import { RupiahPipe } from "../../../pipes/rupiah.pipe";
import { NumberOnlyDirective } from "../../../directives/number-only.directive";
import { RupiahMaskDirective } from "../../../directives/rupiah-mask.directive";

@Component({
  selector: 'app-form-employee',
  imports: [ FormsModule, BreadcrumbComponent, RouterModule, CommonModule, ReactiveFormsModule, NumberOnlyDirective, RupiahMaskDirective ],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.css'
})
export class FormEmployeeComponent implements OnInit {

  employeeForm!: FormGroup

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

  maxDate!: Date

  constructor(
    private employeeService: EmployeeService,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.maxDate = new Date()

    this.employeeForm = this.fb.group({
      id: [
        ''
      ],
      username: [
        '',
        [Validators.required, Validators.minLength(4)]
      ],
      firstName: [
        '',
        [Validators.required]
      ],
      lastName: [
        '',
        [Validators.required]
      ],
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      birthDate: [
        '',
        [Validators.required]
      ],
      basicSalary: [
        '',
        [Validators.required]
      ],
      status: [
        '',
        [Validators.required]
      ],
      group: [
        '',
        [Validators.required]
      ],
      description: [
        ''
      ]
    })

    const employeeId = this.route.snapshot.queryParamMap.get('id')
    console.log(employeeId)
    if (employeeId) {
      this.isEditing = true
      const employees = this.employeeService.getEmployees()
      const existingEmployee = employees.find(employee => employee.id === Number(employeeId))
      if (existingEmployee) {
        this.employeeForm.setValue(existingEmployee)
      }
    }
  }

  saveEmployee(): void {
    console.log(this.employeeForm)
    if (this.employeeForm.invalid) {

      this.globalService.alertTitle = 'error'
      this.globalService.alertVariant = 'error'
      this.globalService.alertMessage = 'fill the required fields'
      this.globalService.alertDuration = 3000
      this.globalService.showAlert()
      return
    }

    this.globalService.alertTitle = 'success'
    this.globalService.alertVariant = 'success'
    if(this.isEditing) {
      this.employeeService.updateEmployee(this.employeeForm.value)
      this.globalService.alertMessage = 'success update employee '+this.employeeForm.value.firstName
    } else {
      this.employeeForm.setValue({...this.employeeForm.value, id: 0})
      this.employeeService.addEmployee(this.employeeForm.value)
      this.globalService.alertMessage = 'success add employee '+this.employeeForm.value.firstName
    }
    this.globalService.alertDuration = 3000
    this.globalService.showAlert()
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

  get username() {
    return this.employeeForm.get('username')
  }
  get firstName() {
    return this.employeeForm.get('firstName')
  }
  get lastName() {
    return this.employeeForm.get('lastName')
  }
  get email() {
    return this.employeeForm.get('email')
  }
  get birthDate() {
    return this.employeeForm.get('birthDate')
  }
  get basicSalary() {
    return this.employeeForm.get('basicSalary')
  }
  get status() {
    return this.employeeForm.get('status')
  }
  get group() {
    return this.employeeForm.get('group')
  }
}
