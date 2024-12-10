import { Request, Response } from "express";
import Client from "../models/clientModel";

export const registerClient = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, phone, codUser, whatsapp } = req.body;

 
  try {
    if (!name || !phone || !codUser  || whatsapp === undefined) {
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

export const getClientsByCodUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { codUser } = req.body;

  try {
    if (!codUser) {
      return res
        .status(400)
        .json({ message: "O campo codUser  é obrigatório." });
    }

    const clients = await Client.find({ codUser }).exec();
    res.status(200).json({ clients });
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).json({ message: "Erro ao buscar clientes", error });
  }
};

export const updateClient = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params; // ID do cliente a ser atualizado
  const { codUser, name, phone, whatsapp } = req.body;

  try {
    // Verifique se o cliente existe
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    // Verifique se o codUser  corresponde ao cliente
    if (client.codUser !== codUser) {
      return res
        .status(403)
        .json({ message: "Acesso negado. codUser  inválido." });
    }

    // Atualize o cliente
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { name, phone, whatsapp },
      { new: true } // Retorna o cliente atualizado
    );

    res.status(200).json({
      message: "Cliente atualizado com sucesso!",
      client: updatedClient,
    });
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).json({ message: "Erro ao atualizar cliente", error });
  }
};

export const deleteClient = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { codUser } = req.body;

  try {
    // Verifique se o cliente existe
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    // Verifique se o codUser  corresponde ao cliente
    if (client.codUser !== codUser) {
      return res
        .status(403)
        .json({ message: "Acesso negado. codUser  inválido." });
    }

    // Exclua o cliente
    await Client.findByIdAndDelete(id);

    res.status(200).json({ message: "Cliente excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    res.status(500).json({ message: "Erro ao excluir cliente", error });
  }
};
