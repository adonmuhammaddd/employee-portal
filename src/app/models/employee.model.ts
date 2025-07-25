export interface Employee {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  birthDate: Date
  basicSalary: number
  status: string
  group: string
  description: Date
}

export enum EmployeeStatus {
  'Contract',
  'Fulltime'
}

export enum EmployeeGroup {
  'IT',
  'Finance',
  'Marketing',
  'Sales',
  'Digital',
  'HR',
  'Operation'
}
