import { Router } from "express";

import validation from "../middlewares/validation";
import { accountOperationValidator } from "../controllers/accountOperations/validator";
import {
  createOperation,
  getOperationsByAccountNumber,
} from "../controllers/accountOperations/controller";

const accountOperationsRouter = Router();

accountOperationsRouter.get("/:accountNumber", getOperationsByAccountNumber);

accountOperationsRouter.post(
  "/",
  validation(accountOperationValidator),
  createOperation
);

export default accountOperationsRouter;
