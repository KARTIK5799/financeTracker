import { Component, OnInit } from '@angular/core';
import { SignUpModel } from '../loginsignup/loginsignup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent implements OnInit {
  
  storedData: SignUpModel[] = [];
  totalBalance: number = 0;
  totalIncome: number = 0;
  totalSpendings: number = 0;
  transactionHistory: any[] = [];

  ngOnInit() {
    const data = localStorage.getItem('angular17users');

    if (data) {
      try {
        this.storedData = JSON.parse(data);
        this.calculateTotals();
        this.prepareTransactionHistory();
      } catch (e) {
        console.error('Error parsing local storage data', e);
      }
    } else {
      console.log('No data found in local storage');
    }
  }

  calculateTotals() {
    let balance = 0;
    let income = 0;
    let spendings = 0;

    this.storedData.forEach(user => {
      user.accounts.forEach(account => {
        balance += account.balance;
        account.transactions.forEach(transaction => {
          if (transaction.type === 'income') {
            income += transaction.amount;
          } else {
            spendings += transaction.amount;
          }
        });
      });
    });

    this.totalBalance = balance;
    this.totalIncome = income;
    this.totalSpendings = spendings;
  }

  prepareTransactionHistory() {
    this.transactionHistory = this.storedData.flatMap(user =>
      user.accounts.flatMap(account => account.transactions)
    ).map(transaction => ({
      ...transaction,
      date: new Date(transaction.date) 
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
