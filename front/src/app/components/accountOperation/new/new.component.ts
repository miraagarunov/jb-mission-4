// import { Component } from '@angular/core';
// import { AccountOperationService } from '../../../services/account-operations.service';
// import {
//   FormControl,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { AccountOperation } from '../../../models/accountOperation/account-operation.model';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-new',
//   imports: [ReactiveFormsModule],
//   templateUrl: './new.component.html',
//   styleUrls: ['./new.component.css'],
// })
// export class NewComponent {
//   constructor(
//     private accountOperationService: AccountOperationService,
//     private router: Router
//   ) {}

//   newForm = new FormGroup({
//     accountNumber: new FormControl('', [
//       Validators.required,
//       Validators.pattern('^[0-9]{6,}$'),
//     ]),
//     type: new FormControl('deposit', [Validators.required]),
//     amount: new FormControl(0, [Validators.required, Validators.min(1)]),
//     interest: new FormControl(0, [Validators.min(0)]),
//     payments: new FormControl(0, [Validators.min(1)]),
//   });

//   async addAccountOperation() {
//     if (this.newForm.invalid) return;

//     try {
//       const newOperation: AccountOperation = this.newForm
//         .value as AccountOperation;
//       await this.accountOperationService.create(newOperation);
//       this.router.navigate(['/list']);
//     } catch (e) {
//       alert('Error adding operation: ' + e);
//     }
//   }

//   onTypeChange() {
//     const type = this.newForm.get('type')?.value;
//     if (type === 'loan') {
//       this.newForm
//         .get('interest')
//         ?.setValidators([Validators.required, Validators.min(0)]);
//       this.newForm
//         .get('payments')
//         ?.setValidators([Validators.required, Validators.min(1)]);
//     } else {
//       this.newForm.get('interest')?.clearValidators();
//       this.newForm.get('payments')?.clearValidators();
//     }
//     this.newForm.get('interest')?.updateValueAndValidity();
//     this.newForm.get('payments')?.updateValueAndValidity();
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { OperationType } from '../../../models/accountOperation/account-operation.model';
import { OperationDraft } from '../../../models/accountOperation/operationDraft.model';
import { AccountOperationsService } from '../../../services/account-operations.service';

@Component({
  selector: 'app-new-operation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewOperationComponent implements OnInit {
  newForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private operationsService: AccountOperationsService
  ) {}

  ngOnInit() {
    this.newForm = this.fb.nonNullable.group({
      accountNumber: ['', Validators.required],
      type: ['deposit' as OperationType, Validators.required],
      amount: [[Validators.required, Validators.min(1)]],
      interest: [],
      payments: [],
    });
  }

  operationType() {
    return this.newForm.controls['type'].value;
  }

  async addOperation() {
    if (this.newForm.invalid) return;

    const draft: OperationDraft = this.newForm.getRawValue();

    if (draft.type !== 'loan') {
      delete draft.interest;
      delete draft.payments;
    }

    console.log('Sending draft:', draft);
    await this.operationsService.create(draft);
    this.newForm.reset();
  }
}
