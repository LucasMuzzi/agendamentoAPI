import Client from "../models/clientModel";

export class ClientService {
  async registerClient(
    name: string,
    phone: string,
    codUser: string,
    whatsapp: boolean
  ) {
    const newClient = new Client({ name, phone, codUser, whatsapp });
    await newClient.save();
    return newClient;
  }

  async getClientsByCodUser(codUser: string) {
    const clients = await Client.find({ codUser }).exec();
    return clients;
  }

  async updateClient(
    id: string,
    codUser: string,
    name: string,
    phone: string,
    whatsapp: boolean
  ) {
    const client = await Client.findById(id);
    if (!client) {
      throw new Error("Cliente não encontrado.");
    }

    if (client.codUser !== codUser) {
      throw new Error("Acesso negado. codUser  inválido.");
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { name, phone, whatsapp },
      { new: true }
    );

    return updatedClient;
  }

  async deleteClient(id: string, codUser: string) {
    const client = await Client.findById(id);
    if (!client) {
      throw new Error("Cliente não encontrado.");
    }

    if (client.codUser !== codUser) {
      throw new Error("Acesso negado. codUser  inválido.");
    }

    await Client.findByIdAndDelete(id);
  }
}
