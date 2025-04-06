import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOperation } from '../../../models/accountOperation/account-operation.model';

@Component({
  selector: 'app-operation-single',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
})
export class OperationSingleComponent {
  @Input() operation!: AccountOperation;
}
