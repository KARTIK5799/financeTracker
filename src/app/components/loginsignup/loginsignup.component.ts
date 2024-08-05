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
  
    localStorage.setItem('loggedUser', JSON.stringify(this.signUpObj));
    
    this.router.navigate(['/dashboard']);
    alert('Registration Success');
  }
  
  onLogin() {
    const localUsers = localStorage.getItem('angular17users');
    if (localUsers != null) {
      const users = JSON.parse(localUsers);
      const isUserPresent = users.find((user: SignUpModel) => user.email === this.loginObj.email && user.password === this.loginObj.password);
      if (isUserPresent) {
    
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('No users found');
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


export class SignUpModel {
  name: string = '';
  email: string = '';
  password: string = '';
  mobileNumber: string = ''; 
  address: string = '';      

  transactions: TransactionModel[] = [
   
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

export class TransactionModel {
  constructor(
    public id: string = '',
    public type: 'income' | 'expense' = 'income',
    public amount: number = 0,
    public description: string = '',
    public date: Date = new Date(),
    public category: string = ''
  ) {}
}
