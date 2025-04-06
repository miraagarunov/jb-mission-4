import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OperationSingleComponent } from '../single/single.component';
import { AccountOperation } from '../../../models/accountOperation/account-operation.model';
import { AccountOperationsService } from '../../../services/account-operations.service';

@Component({
  selector: 'app-operation-list',
  standalone: true,
  imports: [CommonModule, FormsModule, OperationSingleComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class OperationListComponent {
  accountNumber: string = '';
  operations: AccountOperation[] = [];
  loading = false;

  constructor(private operationsService: AccountOperationsService) {}

  async fetch() {
    this.loading = true;
    this.operations = await this.operationsService.getByAccountNumber(
      this.accountNumber
    );
    this.loading = false;
  }
}
