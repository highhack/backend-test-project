import { Router, Request, Response } from "express";
import { User, usersService } from "../domine/users-service";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../input-validation-middleware";

export const userRouter = Router({});

const loginValidation = body("login").isString().trim();
const emailValidation = body("email").isString().trim();

const passwordValidation = body("password").isString().trim();

userRouter.post(
  "/",
  loginValidation,
  emailValidation,
  passwordValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const { login, email, password } = req.body;
    const newProduct = await usersService.createUser(login, email, password);
    res.status(201).send(newProduct);
  }
);
