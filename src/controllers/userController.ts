import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/userModel";

dotenv.config();

const resetCodes = new Map<string, string>();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, codUser } = req.body;

    const newUser = new User({ name, email, password, codUser });
    await newUser.save();

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Senha incorreta" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, codUser: user.codUser },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      token,
      codUser: user.codUser,
    });
  } catch (error) {
    next(error);
  }
};

export const requestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const resetCode = randomBytes(4).toString("hex");
    resetCodes.set(email, resetCode);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Recuperação de senha",
      text: `Seu código de verificação é: ${resetCode}`,
    });

    res
      .status(200)
      .json({ message: "Código de verificação enviado para o e-mail" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    next(error);
  }
};

export const verifyResetCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, code, newpass } = req.body;

    const storedCode = resetCodes.get(email);
    if (!storedCode || storedCode !== code) {
      res.status(400).json({ message: "Código de verificação inválido" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    if (!newpass) {
      res.status(400).json({ message: "Nova senha não pode ser vazia" });
      return;
    }

    user.password = newpass;
    await user.save();

    resetCodes.delete(email);

    res.status(200).json({ message: "Senha redefinida com sucesso" });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Para JWT, você pode simplesmente informar ao cliente para remover o token.
    // Se você estiver usando um sistema de blacklist, adicione o token à blacklist aqui.

    res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (error) {
    next(error);
  }
};
