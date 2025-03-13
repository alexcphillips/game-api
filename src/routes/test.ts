import { Request, Response } from "express";

export const greetUser = (req: Request, res: Response): void => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
};
