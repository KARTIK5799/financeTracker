import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  ngOnInit() {
    // Load user data from local storage
    const userData = localStorage.getItem('angular17users');
    if (userData) {
      const users = JSON.parse(userData);
      if (Array.isArray(users) && users.length > 0) {
        this.user = users[0];
      }
    }
  }
}
