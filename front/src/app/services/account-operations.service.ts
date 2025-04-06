// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AccountOperation } from '../models/accountOperation/account-operation.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class AccountOperationService {
//   private apiUrl = 'https://your-api-url.com/operations'; // שנה לכתובת ה-API שלך

//   constructor(private http: HttpClient) {}

//   // פונקציה להוספת פעולה חדשה
//   create(accountOperation: AccountOperation): Observable<AccountOperation> {
//     return this.http.post<AccountOperation>(this.apiUrl, accountOperation);
//   }

//   // פונקציה לקבלת כל הפעולות עבור חשבון
//   getOperations(accountNumber: string): Observable<AccountOperation[]> {
//     return this.http.get<AccountOperation[]>(
//       `${this.apiUrl}?accountNumber=${accountNumber}`
//     );
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { AccountOperation } from '../models/accountOperation/account-operation.model';
import { OperationDraft } from '../models/accountOperation/operationDraft.model';

@Injectable({
  providedIn: 'root',
})
export class AccountOperationsService {
  constructor(private httpClient: HttpClient) {}

  async getByAccountNumber(accountNumber: string): Promise<AccountOperation[]> {
    const observable = this.httpClient.get<AccountOperation[]>(
      `${environment.restServerUrl}/operations/${accountNumber}`
    );
    return firstValueFrom(observable);
  }

  async create(draft: OperationDraft): Promise<AccountOperation> {
    const observable = this.httpClient.post<AccountOperation>(
      `${environment.restServerUrl}/operations`,
      draft
    );
    return firstValueFrom(observable);
  }
}
