import { Request, Response } from "express";
import Client from "../models/clientModel";

export const registerClient = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, phone, codUser, whatsapp } = req.body;

  try {
    if (!name || !phone || !codUser) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    const newClient = new Client({ name, phone, codUser, whatsapp });
    await newClient.save();

    res
      .status(201)
      .json({ message: "Cliente cadastrado com sucesso!", client: newClient });
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    res.status(500).json({ message: "Erro ao cadastrar cliente", error });
  }
};

export const getClientsByCodUser  = async (req: Request, res: Response): Promise<any> => {
  const { codUser  } = req.body;

  try {
    if (!codUser ) {
      return res.status(400).json({ message: "O campo codUser  é obrigatório." });
    }

    const clients = await Client.find({ codUser  }).exec();
    res.status(200).json({ clients });
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).json({ message: "Erro ao buscar clientes", error });
  }
};
