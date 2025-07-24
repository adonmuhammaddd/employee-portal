import { Injectable } from '@angular/core';
import { Employee } from "../models/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesKey = 'employees';

  constructor() { }

  getEmployees(): Employee[] {
    const employees = localStorage.getItem(this.employeesKey)
    return employees ? JSON.parse(employees) : []
  }

  addEmployee(employee: Employee): void {
    const employees = this.getEmployees()
    employee.id = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1
    employees.push(employee)
    localStorage.setItem(this.employeesKey, JSON.stringify(employees))
  }

  updateEmployee(updatedEmployee: Employee): void {
    const employees = this.getEmployees()
    const index = employees.findIndex(employee => employee.id === updatedEmployee.id)
    if (index !== -1) {
      employees[index] = updatedEmployee
      localStorage.setItem(this.employeesKey, JSON.stringify(employees))
    }
  }

  deleteEmployee(id: number): void {
    const employees = this.getEmployees();
    const updatedEmployees = employees.filter(user => user.id !== id);
    localStorage.setItem(this.employeesKey, JSON.stringify(updatedEmployees));
  }
}
