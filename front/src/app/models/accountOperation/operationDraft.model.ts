export type OperationType = 'deposit' | 'withdrawal' | 'loan';

export interface OperationDraft {
  accountNumber: string;
  type: OperationType;
  amount: number;
  interest?: number;
  payments?: number;
  date?: Date;
}
