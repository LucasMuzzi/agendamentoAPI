import { Request, Response, NextFunction } from "express";
import ServiceType from "../models/serviceTypesModels";
import Schedule from "../models/scheduleModels";
import Upload from "../models/uploadsModel";
import fs from "fs"; // Para manipulação de arquivos
import path from "path"; // Para manipulação de caminhos

// Função para gerar os horários
const generateSchedule = (
  start: string,
  end: string,
  interval: number
): string[] => {
  const schedule: string[] = [];
  const startTime = new Date(`1970-01-01T${start}:00`);
  const endTime = new Date(`1970-01-01T${end}:00`);

  while (startTime <= endTime) {
    const hours = startTime.getHours().toString().padStart(2, "0");
    const minutes = startTime.getMinutes().toString().padStart(2, "0");
    schedule.push(`${hours}:${minutes}`);
    startTime.setMinutes(startTime.getMinutes() + interval);
  }

  return schedule;
};
// Função para criar o tipo de serviço
export const createServiceType = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { nome, codUser } = req.body;

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

// Função para buscar o tipo de serviço
export const getServiceTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { codUser } = req.body;

    if (!codUser) {
      res.status(400).json({ message: "O codUser  é obrigatório." });
      return;
    }

    const serviceTypes = await ServiceType.find({ codUser });
    res.status(200).json(serviceTypes);
  } catch (error) {
    next(error);
  }
};

// Função para criar o horário
export const createSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { horarioInicio, horarioFim, intervalo, codUser } = req.body;

    if (!horarioInicio || !horarioFim || !intervalo || !codUser) {
      res.status(400).json({
        message:
          "horarioInicio, horarioFim, intervalo e codUser  são obrigatórios.",
      });
      return;
    }

    const intervalNumber = parseInt(intervalo, 10);
    if (isNaN(intervalNumber) || intervalNumber <= 0) {
      res.status(400).json({
        message: "Intervalo deve ser um número maior que zero.",
      });
      return;
    }

    const schedule = generateSchedule(
      horarioInicio,
      horarioFim,
      intervalNumber
    );

    const existingSchedule = await Schedule.findOne({ codUser });

    if (existingSchedule) {
      existingSchedule.horarios = schedule;
      await existingSchedule.save();
      res.status(200).json({
        message: "Horários atualizados com sucesso.",
        schedule,
        codUser,
      });
      return;
    } else {
      const newSchedule = new Schedule({
        codUser,
        horarios: schedule,
      });
      await newSchedule.save();
      res.status(201).json({
        message: "Novo horário criado com sucesso.",
        schedule,
        codUser,
      });
      return;
    }
  } catch (error) {
    next(error);
  }
};

// Função para buscar os horários
export const getSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { codUser } = req.body;

    if (!codUser) {
      res.status(400).json({ message: "O codUser  é obrigatório." });
      return;
    }

    // Buscar o documento de horários correspondente ao codUser
    const schedule = await Schedule.findOne({ codUser });

    if (!schedule) {
      res
        .status(404)
        .json({ message: "Nenhum horário encontrado para este codUser ." });
      return;
    }

    // Retornar os horários encontrados
    res.status(200).json(schedule);
  } catch (error) {
    next(error);
  }
};

export const uploadImage = async (
  req: Request & { file?: Express.Multer.File },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Nenhum arquivo enviado." });
      return;
    }

    const { codUser } = req.body;

    const existingUpload = await Upload.findOne({ codUser });

    if (existingUpload) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        existingUpload.logotipo
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      existingUpload.logotipo = req.file.filename;
      await existingUpload.save();

      res.status(200).json({
        message: "Imagem atualizada com sucesso!",
        logotipo: existingUpload.logotipo,
      });
    } else {
      const newUpload = new Upload({
        codUser,
        logotipo: req.file.filename,
      });

      await newUpload.save();

      res.status(201).json({
        message: "Imagem enviada e salva com sucesso!",
        logotipo: req.file.filename,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Função para buscar a imagem
export const getImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { codUser } = req.body;

    if (!codUser) {
      res.status(400).json({ message: "O codUser  é obrigatório." });
      return;
    }

    const upload = await Upload.findOne({ codUser });

    if (!upload) {
      res
        .status(404)
        .json({ message: "Nenhuma imagem encontrada para este codUser ." });
      return;
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      upload.logotipo
    }`;

    res.status(200).json({
      message: "Imagem encontrada com sucesso.",
      logotipo: imageUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const removeServiceType = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, codUser } = req.body;

    if (!id || !codUser) {
      res.status(400).json({
        message: "O ID do serviço e o codUser  são obrigatórios.",
      });
      return;
    }

    const deletedServiceType = await ServiceType.findOneAndDelete({
      _id: id,
      codUser,
    });

    if (!deletedServiceType) {
      res.status(404).json({
        message:
          "Tipo de serviço não encontrado ou você não tem permissão para removê-lo.",
      });
      return;
    }

    res.status(200).json({
      message: "Tipo de serviço removido com sucesso.",
      deletedServiceType,
    });
  } catch (error) {
    next(error);
  }
};
