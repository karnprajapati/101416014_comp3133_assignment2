import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../../shared/header/header.component'; // adjust path if needed



@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    HeaderComponent,
  ]
})

export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'department', 'position', 'actions'];

  searchDept: string = '';
  searchPos: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = [...data];
    });
  }

  filterEmployees() {
    this.filteredEmployees = this.employees.filter(emp =>
      emp.department.toLowerCase().includes(this.searchDept.toLowerCase()) &&
      emp.position.toLowerCase().includes(this.searchPos.toLowerCase())
    );
  }

  viewEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }

  editEmployee(id: string) {
    this.router.navigate(['/update-employee', id]);
  }

  navigateToAddEmployee() {
    this.router.navigate(['/add-employee']);
  }
  

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.employees = this.employees.filter(emp => emp.id !== id);
        this.filterEmployees(); // refresh filtered list too
      });
    }
  }
}
