import { Injectable } from '@angular/core';
import { Employee } from "../models/employee.model";
import _moment from 'moment';
import Swal from 'sweetalert2';

const moment = _moment

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesKey = 'employees';

  constructor() { }


  loadEmployees(): void {
    const fakeData = require('../../employees.json');
    localStorage.setItem(this.employeesKey, JSON.stringify(fakeData));
  }

  getEmployees(): Employee[] {
    const employees = localStorage.getItem(this.employeesKey)
    return employees ? JSON.parse(employees) : []
  }

  addEmployee(employee: Employee): void {
    const employees = this.getEmployees()
    employee.id = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1
    employee.description = moment().toDate()
    employee.basicSalary = this.parseCurrency(employee.basicSalary.toString())
    employees.push(employee)
    localStorage.setItem(this.employeesKey, JSON.stringify(employees))
  }

  updateEmployee(updatedEmployee: Employee): void {
    const employees = this.getEmployees()
    const index = employees.findIndex(employee => employee.id === updatedEmployee.id)
    if (index !== -1) {
      employees[index] = updatedEmployee
      employees[index].description = moment().toDate()
      employees[index].basicSalary = this.parseCurrency(employees[index].basicSalary.toString())
      localStorage.setItem(this.employeesKey, JSON.stringify(employees))
    }
  }

  deleteEmployee(id: number): void {
    const employees = this.getEmployees()
    const updatedEmployees = employees.filter(employee => employee.id !== id)

    Swal.fire("Deleted!", "", "success")
    localStorage.setItem(this.employeesKey, JSON.stringify(updatedEmployees))
  }

  parseCurrency(currencyString: string) {
    return parseFloat(currencyString.replace(/Rp\.?\s*/g, '').replace(/\./g, ''));
  }
}
