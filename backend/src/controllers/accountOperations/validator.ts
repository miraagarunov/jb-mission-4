import Joi from "joi";

export const accountOperationValidator = Joi.object({
  accountNumber: Joi.string().required(),
  type: Joi.string().valid("deposit", "withdrawal", "loan").required(),
  amount: Joi.number().min(0).required(),
  date: Joi.date(),

  interest: Joi.number().min(0).when("type", {
    is: "loan",
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  payments: Joi.number().integer().min(1).when("type", {
    is: "loan",
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
});
