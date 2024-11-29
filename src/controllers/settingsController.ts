import { Request, Response, NextFunction } from "express";
import ServiceType from "../models/settingsModels";

export const createServiceType = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { nome, codUser } = req.body;

    // Verifica se o nome e o codUser  foram fornecidos
    if (!nome || !codUser) {
      res.status(400).json({
        message: "O nome do serviço e o codUser  são obrigatórios.",
      });
      return;
    }

    const newServiceType = new ServiceType({ nome, codUser });
    await newServiceType.save();
    res.status(201).json(newServiceType);
  } catch (error) {
    next(error);
  }
};

export const getServiceTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { codUser } = req.body;

    console.log(codUser)

    // Verifica se o codUser  foi fornecido
    if (!codUser) {
      res.status(400).json({ message: "O codUser  é obrigatório." });
      return;
    }

    // Busca os tipos de serviço pelo codUser
    const serviceTypes = await ServiceType.find({ codUser });
    res.status(200).json(serviceTypes);
  } catch (error) {
    next(error);
  }
};
