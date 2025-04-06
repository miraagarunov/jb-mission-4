import { Request, Response, NextFunction } from "express";
import { accountOperationValidator } from "./validator";
import { AccountOperationModel } from "../../models/accountOperation";

export async function getOperationsByAccountNumber(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accountNumber } = req.params;
    const operations = await AccountOperationModel.find({ accountNumber });
    res.json(operations.map((op) => op.toObject()));
  } catch (e) {
    next(e);
  }
}

export async function createOperation(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { error } = accountOperationValidator.validate(req.body);
    if (error) return;

    const operation = new AccountOperationModel(req.body);
    await operation.save();
    res.json(operation.toObject());
  } catch (e) {
    next(e);
  }
}
