import * as faker from '@faker-js/faker';
import * as fs from 'fs';
import moment from "moment";

function generateFakeEmployee() {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    birthDate: faker.date.birthdate(),
    basicSalary: faker.finance.amount(),
    status: faker.helpers.enumValue('Contract', 'Full Time'),
    group: faker.helpers.enumValue('IT',
      'Finance',
      'Marketing',
      'Sales',
      'Digital',
      'HR'
    ),
    description: randomDate
  };
}

function generateFakeEmployees(count) {
  const employees = []
  for (let i = 0; i < count; i++) {
    employees.push(generateFakeEmployee());
  }

  return employees;
}

function generateRandomDate(startDate, endDate) {
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);

  const timeDifference = endMoment.diff(startMoment);

  const randomMilliseconds = Math.random() * timeDifference;

  const randomMoment = startMoment.add(randomMilliseconds, 'milliseconds');

  return randomMoment;
}

const startDate = '2020-01-01';
const endDate = '2025-12-31';
const randomDate = generateRandomDate(startDate, endDate);

const fakeEmployees = generateFakeEmployees(5);
console.log('AAAAAAAAAAAAAAAAA ====================')

const fakeDataFilePath = './fakeEmpl.json';
fs.writeFileSync(fakeDataFilePath, JSON.stringify(fakeEmployees, null, 2));

console.log(`Successfully generated ${fakeEmployees.length} fake employees and saved to ${fakeDataFilePath}`);
