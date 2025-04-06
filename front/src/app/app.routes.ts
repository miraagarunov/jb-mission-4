import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/layout/not-found/not-found.component';
import { OperationListComponent } from './components/accountOperation/list/list.component';
import { NewOperationComponent } from './components/accountOperation/new/new.component';

export const routes: Routes = [
  { path: '', component: OperationListComponent },
  { path: 'new', component: NewOperationComponent },
  { path: '**', component: NotFoundComponent },
];
