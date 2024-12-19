// controllers/UserController.ts
import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/userService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, email, password, codUser } = req.body;
      const newUser = await this.userService.createUser({
        name,
        email,
        password,
        codUser,
      });
      res
        .status(201)
        .json({ message: "Usuário criado com sucesso", user: newUser });
    } catch (error) {
      next(error);
    }
  };

  public getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.userService.getUser();

      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  };

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { token, codUser } = await this.userService.loginUser(
        email,
        password
      );
      res.status(200).json({ token, codUser });
    } catch (error) {
      next(error);
    }
  };

  public requestPasswordReset = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.body;
      await this.userService.requestPasswordReset(email);
      res
        .status(200)
        .json({ message: "Código de verificação enviado para o e-mail" });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      next(error);
    }
  };

  public verifyResetCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, code, newpass } = req.body;
      await this.userService.verifyResetCode(email, code, newpass);
      res.status(200).json({ message: "Senha redefinida com sucesso" });
    } catch (error) {
      next(error);
    }
  };

  public logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const message = this.userService.logoutUser();
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  };
}
