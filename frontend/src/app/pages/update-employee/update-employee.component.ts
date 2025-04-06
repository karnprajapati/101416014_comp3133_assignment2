import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
 
@Component({
  selector: 'app-update-employee',
  standalone: true,
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    this.employeeService.getEmployeeById(this.employeeId).subscribe((data) => {
      this.employeeForm = this.fb.group({
        name: [data.name, Validators.required],
        email: [data.email, [Validators.required, Validators.email]],
        department: [data.department, Validators.required],
        position: [data.position, Validators.required],
      });
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const updatedData = this.employeeForm.value;
      this.employeeService.updateEmployee(this.employeeId, updatedData).subscribe(() => {
        alert('Employee updated!');
        this.router.navigate(['/employees']);
      });
    }
  }
}
