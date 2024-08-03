import { Component, OnInit } from '@angular/core';
import { SignUpModel, TransactionModel } from '../loginsignup/loginsignup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: TransactionModel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor() { }

  ngOnInit() {
    const data = localStorage.getItem('angular17users');

    if (data) {
      try {
        const storedData: SignUpModel[] = JSON.parse(data);
        this.transactions = storedData.flatMap(user => user.transactions);
        this.transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
      } catch (e) {
        console.error('Error parsing local storage data', e);
      }
    } else {
      console.log('No data found in local storage');
    }
  }

  get paginatedTransactions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.transactions.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get totalPages() {
    return Math.ceil(this.transactions.length / this.itemsPerPage);
  }
}
