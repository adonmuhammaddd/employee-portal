import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { EmployeeGroup, EmployeeStatus } from "../models/employee.model";

@Injectable({
  providedIn: 'root'
})
export class FakerServiceService {

  constructor() { }

  generateFakeEmployee() {
    return {
      id: faker.string.uuid(),
      username: faker.internet.username(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      birthDate: faker.date.birthdate(),
      basicSalary: faker.finance.amount(),
      status: faker.helpers.enumValue(EmployeeStatus),
      group: faker.helpers.enumValue(EmployeeGroup),
      description: faker.date.anytime()
    };
  }

  generateFakeEmployees(count: number) {
    let employees = []
    for (let i = 0; i < count; i++) {
      employees.push(this.generateFakeEmployee())
    }

    return employees
  }
}
