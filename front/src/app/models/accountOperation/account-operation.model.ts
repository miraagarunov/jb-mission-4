export type OperationType = 'deposit' | 'withdrawal' | 'loan';

export interface AccountOperation {
  id?: string;
  accountNumber: string;
  type: OperationType;
  amount: number;
  date?: Date;
  interest?: number;
  payments?: number;
}
