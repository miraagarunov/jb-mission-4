// import { Component, OnInit, signal } from '@angular/core';
// import { AccountOperation } from '../../../models/accountOperation/account-operation.model';
// import { AccountOperationService } from '../../../services/account-operations.service';

// @Component({
//   selector: 'app-list',
//   templateUrl: './list.component.html',
//   styleUrls: ['./list.component.css'],
// })
// export class ListComponent implements OnInit {
//   list = signal<AccountOperation[]>([]);

//   constructor(private accountOperationService: AccountOperationService) {}

//   ngOnInit(): void {
//     this.fetchAccountOperations('123456');
//   }

//   fetchAccountOperations(accountNumber: string): void {
//     this.accountOperationService.getOperations(accountNumber).subscribe(
//       (operations: AccountOperation[]) => {
//         this.list.set(operations);
//       },
//       (error) => {
//         console.error('Error fetching operations', error);
//         alert('Error fetching operations');
//       }
//     );
//   }

//   addOperation(operation: AccountOperation) {
//     this.list.set([operation, ...this.list()]);
//   }
//   formatDate(date: string): string {
//     return new Date(date).toLocaleDateString();
//   }
// }
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
