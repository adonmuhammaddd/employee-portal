import { Component, OnInit } from '@angular/core';
import { Employee } from "../../../models/employee.model";
import { EmployeeService } from "../../../services/employee.service";
import { CommonModule } from "@angular/common";
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { FormsModule } from "@angular/forms";
import _moment from 'moment';
import { RouterModule } from "@angular/router";
import { RupiahPipe } from "../../../pipes/rupiah.pipe";

const moment = _moment

@Component({
  selector: 'app-employee-list',
  imports: [ CommonModule, BreadcrumbComponent, FormsModule, RouterModule, RupiahPipe ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  private employeesKey = 'employees'
  momentjs: any = moment
  employees: Employee[] = []
  employeeColumns = [
    { name: 'Username', sortColumn: 'username'},
    { name: 'First Name', sortColumn: 'firstName'},
    { name: 'Last Name', sortColumn: 'lastName'},
    { name: 'Email', sortColumn: 'email'},
    { name: 'Birth Date', sortColumn: 'birthDate'},
    { name: 'Basic Salary', sortColumn: 'basicSalary'},
    { name: 'Status', sortColumn: 'status'},
    { name: 'Group', sortColumn: 'group'},
    { name: 'Description', sortColumn: 'description'},
    { name: 'Action', sortColumn: ''}
  ]
  sortableColumns: string[] = [
    'username',
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'basicSalary',
    'status',
    'group',
    'description'
  ]

  sortColumn: string | null = null
  sortDirection: 'asc' | 'desc' | null = null

  displayedData: any[] = []
  filteredData: any[] = []
  currentPage = 1
  itemsPerPage = 10
  countEntries = [10, 25, 50, 100]
  displayedPages: number[] = []

  totalPages = 0
  totalItems: number = 0
  searchText = ''

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    if (!localStorage.getItem(this.employeesKey)) this.employeeService.loadEmployees()
    this.loadEmployees()
  }

  loadEmployees(): void {
    this.employees = this.employeeService.getEmployees()
    this.filteredData = this.employees
    this.updateDisplayedData()
    console.log(this.employees)
  }

  deleteEmployee(employee: Employee): void {
    if (confirm('Are you sure want to delete '+ employee.firstName)) {
      this.employeeService.deleteEmployee(employee.id)
      this.loadEmployees()
    }
  }

  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    this.displayedData = this.filteredData.slice(startIndex, endIndex)
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage)
    this.displayedPages = this.getDisplayedPageNumbers()
    this.totalItems = this.filteredData.length
  }

  sort(column: string) {

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      this.sortColumn = column
      this.sortDirection = 'asc'
    }

    this.filteredData.sort((a: any, b: any) => {
      const valueA = a[column].toLowerCase()
      const valueB = b[column].toLowerCase()
      let comparison = 0

      if (valueA > valueB) {
        comparison = 1
      } else if (valueA < valueB) {
        comparison = -1
      }

      return this.sortDirection === 'asc' ? comparison : -comparison
    })

    this.currentPage = 1
    this.updateDisplayedData()

    Object.keys(this.sortableColumns).forEach((key: any) => {
      if (key !== column) {
        this.sortableColumns[key] = ''
      }
    })
  }

  onEntriesChange() {
    this.updateDisplayedData()
  }

  getDisplayedPageNumbers(): number[] {
    const totalPageNumbers = Math.min(this.totalPages, 5)
    const displayedPageNumbers: number[] = []

    let startPage = Math.max(1, this.currentPage - 2)
    const endPage = Math.min(this.totalPages, startPage + totalPageNumbers - 1)
    startPage = Math.max(1, endPage - totalPageNumbers + 1)

    if (startPage > 1) {
      displayedPageNumbers.push(1)
      if (startPage > 2) {
        displayedPageNumbers.push(-1)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      displayedPageNumbers.push(i)
    }

    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        displayedPageNumbers.push(-1)
      }
      displayedPageNumbers.push(this.totalPages)
    }

    return displayedPageNumbers
  }

  filterData() {
    this.filteredData = this.employees.filter((item: any) => {
      return this.sortableColumns.some((column) =>
        String(item[column]).toLowerCase().includes(this.searchText.toLowerCase())
      )
    })
    this.currentPage = 1
    this.updateDisplayedData()
  }

  changePage(page: number) {
    this.currentPage = page
    this.updateDisplayedData()
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.updateDisplayedData()
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
      this.updateDisplayedData()
    }
  }
}
