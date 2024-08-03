import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  userName: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    // Load user data from local storage
    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.name || 'User';
    }
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
