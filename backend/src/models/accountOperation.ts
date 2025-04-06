import mongoose from "../db/mongoose";

export interface AccountOperation {
  id: string;
  accountNumber: string;
  type: "deposit" | "withdrawal" | "loan";
  amount: number;
  date?: Date;
  interest?: number;
  payments?: number;
}

const AccountOperationSchema = new mongoose.Schema<AccountOperation>(
  {
    accountNumber: { type: String, required: true },
    type: {
      type: String,
      enum: ["deposit", "withdrawal", "loan"],
      required: true,
    },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    interest: {
      type: Number,
      required: function (this: AccountOperation) {
        return this.type === "loan";
      },
    },
    payments: {
      type: Number,
      required: function (this: AccountOperation) {
        return this.type === "loan";
      },
    },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const AccountOperationModel = mongoose.model<AccountOperation>(
  "AccountOperation",
  AccountOperationSchema,
  "AccountOperations"
);
