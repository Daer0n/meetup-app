import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";
import { StatusCodes } from "http-status-codes";

const isValid = <T extends Request>(schema: Schema, property: keyof T) => {
  return (req: T, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      res.status(StatusCodes.BAD_REQUEST).json({ error: message });
    }
  };
};

export default isValid;