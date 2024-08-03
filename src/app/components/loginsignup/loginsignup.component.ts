import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-loginsignup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loginsignup.component.html',
  styleUrls: ['./loginsignup.component.css']
})
export class LoginsignupComponent {
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  isLoginVisible = true;
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  constructor(private router: Router) { }

  onRegister(form: NgForm) {
    if (!this.signUpObj.name || !this.signUpObj.email || !this.signUpObj.password || !this.confirmPassword) {
      alert('All fields are required');
      return;
    }

    if (this.signUpObj.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    } else {
      this.passwordMismatch = false;
    }

    const localUser = localStorage.getItem('angular17users');
    let users = localUser ? JSON.parse(localUser) : [];
    users.push(this.signUpObj);
    localStorage.setItem('angular17users', JSON.stringify(users));
    this.router.navigate(['/dashboard']);
    alert('Registration Success');
  }

  onLogin() {
    const localUsers = localStorage.getItem('angular17users');
    if (localUsers != null) {
      const users = JSON.parse(localUsers);
      const isUserPresent = users.find((user: SignUpModel) => user.email === this.loginObj.email && user.password === this.loginObj.password);
      if (isUserPresent != undefined) {
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    }
  }

  toggleRegister() {
    this.isLoginVisible = !this.isLoginVisible;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
}

// Models
export class SignUpModel {
  name: string = 'John Doe';
  email: string = 'john.doe@example.com';
  password: string = 'password123';
  incomes: IncomeModel[] = [
    new IncomeModel('Salary', 2000, new Date()),
    new IncomeModel('Freelance', 1500, new Date('2024-07-15')),
    new IncomeModel('Bonus', 500, new Date('2024-06-30'))
  ];
  expenses: ExpenseModel[] = [
    new ExpenseModel('Rent', 800, new Date()),
    new ExpenseModel('Utilities', 150, new Date('2024-07-05')),
    new ExpenseModel('Groceries', 300, new Date('2024-07-10')),
    new ExpenseModel('Transportation', 100, new Date('2024-07-12'))
  ];
  accounts: AccountModel[] = [
    new AccountModel('123456', 'Bank XYZ', 'XYZ123', 5000, 'savings', [
      new TransactionModel('1', 'income', 2000, 'Salary', new Date()),
      new TransactionModel('2', 'expense', 800, 'Rent', new Date())
    ]),
    new AccountModel('654321', 'Bank ABC', 'ABC987', 3000, 'current', [
      new TransactionModel('3', 'income', 1500, 'Freelance', new Date('2024-07-15')),
      new TransactionModel('4', 'expense', 150, 'Utilities', new Date('2024-07-05')),
      new TransactionModel('5', 'expense', 100, 'Transportation', new Date('2024-07-12'))
    ]),
    new AccountModel('789012', 'Bank DEF', 'DEF654', 7000, 'savings', [
      new TransactionModel('6', 'income', 500, 'Bonus', new Date('2024-06-30')),
      new TransactionModel('7', 'expense', 300, 'Groceries', new Date('2024-07-10'))
    ])
  ];
}


export class LoginModel {
  email: string = '';
  password: string = '';

  constructor() {
    this.email = '';
    this.password = '';
  }
}

export class IncomeModel {
  constructor(
    public source: string = '',
    public amount: number = 0,
    public date: Date = new Date()
  ) {}
}

export class ExpenseModel {
  constructor(
    public category: string = '',
    public amount: number = 0,
    public date: Date = new Date()
  ) {}
}

export class TransactionModel {
  constructor(
    public id: string = '',
    public type: 'income' | 'expense' = 'income',
    public amount: number = 0,
    public description: string = '',
    public date: Date = new Date()
  ) {}
}

export class AccountModel {
  constructor(
    public accountNumber: string = '',
    public bankName: string = '',
    public ifscCode: string = '',
    public balance: number = 0,
    public accountType: 'savings' | 'current' | 'credit' = 'savings',
    public transactions: TransactionModel[] = []
  ) {}
}
