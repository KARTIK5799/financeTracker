import { Component, OnInit } from '@angular/core';
import { SignUpModel } from '../loginsignup/loginsignup.component';
import { CommonModule } from '@angular/common';
import { AddTransactionModalComponent } from '../add-transaction-modal/add-transaction-modal.component';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [CommonModule, AddTransactionModalComponent],
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css'],
})
export class DashboardContentComponent implements OnInit {
  storedData: SignUpModel[] = [];
  totalBalance: number = 0;
  totalIncome: number = 0;
  totalSpendings: number = 0;
  transactionHistory: any[] = [];
  showModal: boolean = false;

  ngOnInit() {
    this.loadStoredData();
  }

  loadStoredData() {
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
    let income = 0;
    let spendings = 0;

    this.storedData.forEach((user) => {
      user.transactions.forEach((transaction) => {
        if (transaction.type === 'income') {
          income += transaction.amount;
        } else if (transaction.type === 'expense') {
          spendings += transaction.amount;
        }
      });
    });

    this.totalIncome = income;
    this.totalSpendings = spendings;
    this.totalBalance = income - spendings;
  }

  prepareTransactionHistory() {
    this.transactionHistory = this.storedData
      .flatMap((user) => user.transactions)
      .map((transaction) => ({
        ...transaction,
        date: new Date(transaction.date),
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onTransactionAdded() {
    this.loadStoredData();
  }
}
