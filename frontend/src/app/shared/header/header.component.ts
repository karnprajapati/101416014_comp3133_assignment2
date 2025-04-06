import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, MatToolbarModule]
})

export class HeaderComponent {
  constructor(private router: Router) {}

  logout(): void {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('token'); // Clear token or session data
      window.location.href = '/login';  // Navigate to login (hard redirect)
      alert('You have been logged out.');
    }
  }
  
}
