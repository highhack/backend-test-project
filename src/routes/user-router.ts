import { Router } from "express";
import { usersService } from "../domine/users-service";

export const userRouter = Router({});

userRouter.post("/", async (req: Request, res: Response) => {
  const { login, email, password } = req.body;
  const newProduct = await usersService.createUser(login, email, password);
  res.status(201).send(newProduct);
});
