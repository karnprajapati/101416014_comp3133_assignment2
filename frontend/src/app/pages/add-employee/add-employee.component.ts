import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';



@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      position: ['', Validators.required],
    });
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
onSubmit() {
  if (this.employeeForm.valid && this.selectedFile) {
    const newEmp = this.employeeForm.value;

    const uploadData = new FormData();
    uploadData.append('profilePic', this.selectedFile);

    fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: uploadData
    })
    .then(response => response.json())
    .then(result => {
      const profilePicUrl = result.url;

      const employeeData = {
        name: newEmp.name,
        email: newEmp.email,
        department: newEmp.department,
        position: newEmp.position,
        profilePic: profilePicUrl,
      };

      this.employeeService.addEmployee({ ...employeeData }).subscribe({
        next: () => {
          alert('Employee added successfully!');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('GraphQL error:', err);
          alert('Failed to save employee details!');
        }
      });
    })
    .catch(err => {
      console.error('File upload error:', err);
      alert('Failed to upload image!');
    });
  }
}
}
