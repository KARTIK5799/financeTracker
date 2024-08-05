import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpModel, TransactionModel } from '../loginsignup/loginsignup.component';
import { AddTransactionModalComponent } from '../add-transaction-modal/add-transaction-modal.component';
import { Chart, registerables } from 'chart.js';

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

  incomeExpenseChartData: any[] = [];
  expenseBreakdownChartData: any[] = [];

  ngOnInit() {
    Chart.register(...registerables);
    this.loadStoredData();
    this.prepareCharts();
  }

  loadStoredData() {
    const data = localStorage.getItem('angular17users');
    if (data) {
      try {
        this.storedData = JSON.parse(data);
        this.calculateTotals();
        this.prepareTransactionHistory();
        this.prepareCharts();
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

  prepareCharts() {
   
    const ctxIncomeExpense = (document.getElementById('spendingsChart') as HTMLCanvasElement).getContext('2d');
    if (ctxIncomeExpense) {
      new Chart(ctxIncomeExpense, {
        type: 'bar',
        data: {
          labels: ['Income', 'Expenses'],
          datasets: [{
            label: 'Total',
            data: [this.totalIncome, this.totalSpendings],
            backgroundColor: ['#4caf50', '#f44336']
          }]
        }
      });
    }


    const expenses = this.storedData.flatMap((user) => user.transactions.filter(t => t.type === 'expense'));
    const expenseCategories = expenses.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as { [key: string]: number });

    const ctxExpenseBreakdown = (document.getElementById('pieChart') as HTMLCanvasElement).getContext('2d');
    if (ctxExpenseBreakdown) {
      new Chart(ctxExpenseBreakdown, {
        type: 'pie',
        data: {
          labels: Object.keys(expenseCategories),
          datasets: [{
            data: Object.values(expenseCategories),
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
          }]
        }
      });
    }
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
