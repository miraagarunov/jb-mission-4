import cors from "cors";
import express, { json } from "express";
import { connect } from "./db/mongoose";

import errorLogger from "./middlewares/error/error-logger";
import errorResponder from "./middlewares/error/error-responder";
import notFound from "./middlewares/not-found";

import accountOperationsRouter from "./routers/accountOperations";

const app = express();

export async function start() {
  await connect();

  app.use(cors());
  app.use(json());

  app.use("/operations", accountOperationsRouter);

  app.use(notFound);

  app.use(errorLogger);
  app.use(errorResponder);
}

export default app;
