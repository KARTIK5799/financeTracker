import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],  
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  isEditing: boolean = false;

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const userData = localStorage.getItem('angular17users');
    if (userData) {
      const users = JSON.parse(userData);
      if (Array.isArray(users) && users.length > 0) {
        this.user = users[0];
      }
    }
  }

  enableEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    const userData = localStorage.getItem('angular17users');
    if (userData) {
      let users = JSON.parse(userData);
      if (Array.isArray(users) && users.length > 0) {
        users[0] = this.user; 
        localStorage.setItem('angular17users', JSON.stringify(users));
        this.isEditing = false;
      }
    }
  }

  cancelEditing() {
    this.loadUserData();
    this.isEditing = false;
  }
}
