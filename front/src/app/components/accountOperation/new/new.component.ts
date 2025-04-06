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
