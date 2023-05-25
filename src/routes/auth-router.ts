import { Router, Request, Response } from "express";
import { usersService } from "../domine/users-service";

export const authRouter = Router({});

authRouter.post("/", async (req: Request, res: Response) => {
  const { loginOrEmail, password } = req.body || {};
  const checkResult = await usersService.checkCredentials(
    loginOrEmail,
    password
  );
  res.status(201).send(checkResult);
});
