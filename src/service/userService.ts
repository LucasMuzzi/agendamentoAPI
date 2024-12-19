import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/userModel";

dotenv.config();

const resetCodes = new Map<string, string>();

export class UserService {
  async createUser(data: {
    name: string;
    email: string;
    password: string;
    codUser: string;
  }) {
    const newUser = new User(data);
    await newUser.save();
    return newUser;
  }

  async getUser() {
    const users = await User.find();
    
    return users;
  }

  async loginUser(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, codUser: user.codUser },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "24h" }
    );

    return { token, codUser: user.codUser };
  }

  async requestPasswordReset(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Usuário não encontrado");
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

    return resetCode;
  }

  async verifyResetCode(email: string, code: string, newpass: string) {
    const storedCode = resetCodes.get(email);
    if (!storedCode || storedCode !== code) {
      throw new Error("Código de verificação inválido");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (!newpass) {
      throw new Error("Nova senha não pode ser vazia");
    }

    user.password = newpass;
    await user.save();
    resetCodes.delete(email);
  }

  logoutUser() {
    return { message: "Logout realizado com sucesso" };
  }
}
