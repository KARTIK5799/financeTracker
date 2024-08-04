import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionModel, SignUpModel } from '../loginsignup/loginsignup.component';

@Component({
  selector: 'app-add-transaction-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-transaction-modal.component.html',
  styleUrls: ['./add-transaction-modal.component.css'],
})
export class AddTransactionModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() transactionAdded = new EventEmitter<void>();

  transaction: TransactionModel = new TransactionModel();

  onSubmit(form: NgForm) {
    if (form.valid) {
      const localUser = localStorage.getItem('loggedUser');
      const storedData = localStorage.getItem('angular17users');
      if (localUser && storedData) {
        const user: SignUpModel = JSON.parse(localUser);
        const allUsers: SignUpModel[] = JSON.parse(storedData);

        user.transactions.push(this.transaction);
        const userIndex = allUsers.findIndex(u => u.email === user.email);

        if (userIndex !== -1) {
          allUsers[userIndex] = user;
          localStorage.setItem('angular17users', JSON.stringify(allUsers));
          localStorage.setItem('loggedUser', JSON.stringify(user));
          this.transactionAdded.emit();
          this.close.emit();
        } else {
          alert('User not found in local storage');
        }
      } else {
        alert('No logged in user found or no stored data');
      }
    }
  }

  closeModal() {
    this.close.emit();
  }
}
