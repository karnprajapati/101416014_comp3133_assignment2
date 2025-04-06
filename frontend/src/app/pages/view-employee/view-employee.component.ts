import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
  imports: [CommonModule],
})
export class ViewEmployeeComponent implements OnInit {
  employee: any;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe((data) => {
        const fixedProfilePic = data.profilePic?.startsWith('http')
          ? data.profilePic
          : `http://localhost:4000${data.profilePic}`;
        
        this.employee = {
          ...data,
          profilePic: fixedProfilePic,
        };
  
        console.log('Employee Data:', this.employee);
      });
    }
  }
  

  goBack() {
    this.router.navigate(['/employees']);
  }
}
