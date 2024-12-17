// controllers/ClientController.ts
import { Request, Response } from "express";
import { ClientService } from "../service/clientService";

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  public registerClient = async (req: Request, res: Response): Promise<any> => {
    const { name, phone, codUser, whatsapp } = req.body;

    try {
      if (!name || !phone || !codUser || whatsapp === undefined) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios." });
      }

      const newClient = await this.clientService.registerClient(
        name,
        phone,
        codUser,
        whatsapp
      );
      res
        .status(201)
        .json({
          message: "Cliente cadastrado com sucesso!",
          client: newClient,
        });
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      res.status(500).json({ message: "Erro ao cadastrar cliente", error });
    }
  };

  public getClientsByCodUser = async (
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

      const clients = await this.clientService.getClientsByCodUser(codUser);
      res.status(200).json({ clients });
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      res.status(500).json({ message: "Erro ao buscar clientes", error });
    }
  };

  public updateClient = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params; // ID do cliente a ser atualizado
    const { codUser, name, phone, whatsapp } = req.body;

    try {
      const updatedClient = await this.clientService.updateClient(
        id,
        codUser,
        name,
        phone,
        whatsapp
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

  public deleteClient = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { codUser } = req.body;

    try {
      await this.clientService.deleteClient(id, codUser);
      res.status(200).json({ message: "Cliente excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      res.status(500).json({ message: "Erro ao excluir cliente", error });
    }
  };
}
