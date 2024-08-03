import { Component, OnInit } from '@angular/core';
import { SignUpModel } from '../loginsignup/loginsignup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  storedData: SignUpModel[] = [];

  ngOnInit() {
    const data = localStorage.getItem('angular17users');

    if (data) {
      try {
        this.storedData = JSON.parse(data);
      } catch (e) {
        console.error('Error parsing local storage data', e);
      }
    } else {
      console.log('No data found in local storage');
    }
  }

  getAccounts() {
    return this.storedData.flatMap(user => user.accounts);
  }
}
