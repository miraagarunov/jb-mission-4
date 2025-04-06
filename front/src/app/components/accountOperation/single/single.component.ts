// import { Component, Input, OnInit } from '@angular/core';
// import { AccountOperation } from '../../../models/accountOperation/account-operation.model';

// @Component({
//   selector: 'app-single',
//   templateUrl: './single.component.html',
//   styleUrls: ['./single.component.css'],
// })
// export class SingleComponent implements OnInit {
//   @Input() operation: AccountOperation | null = null;

//   constructor() {}

//   ngOnInit(): void {}
// }
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
