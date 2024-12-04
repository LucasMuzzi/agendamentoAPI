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

    // Verificar se já existe um documento com o codUser
    const existingSchedule = await Schedule.findOne({ codUser });

    if (existingSchedule) {
      // Se existir, atualizar os horários
      existingSchedule.horarios = schedule; // Substituir os horários
      await existingSchedule.save(); // Salvar as alterações
      res.status(200).json({
        message: "Horários atualizados com sucesso.",
        schedule,
        codUser,
      });
      return;
    } else {
      // Se não existir, criar um novo documento
      const newSchedule = new Schedule({
        codUser,
        horarios: schedule,
      });
      await newSchedule.save(); // Salvar o novo documento
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
    // Verifica se um arquivo foi enviado
    if (!req.file) {
      res.status(400).json({ message: "Nenhum arquivo enviado." });
      return;
    }

    const { codUser } = req.body;

    // Verifica se já existe um upload para o codUser
    const existingUpload = await Upload.findOne({ codUser });

    if (existingUpload) {
      // Se já existe, remove a imagem antiga
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        existingUpload.logotipo
      ); // Ajuste o caminho conforme necessário
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Remove a imagem antiga
      }

      // Atualiza o registro existente
      existingUpload.logotipo = req.file.filename; // Atualiza o logotipo
      await existingUpload.save(); // Salva as alterações

      res.status(200).json({
        message: "Imagem atualizada com sucesso!",
        logotipo: existingUpload.logotipo,
      });
    } else {
      // Se não existe, cria um novo registro
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

    // Buscar o registro de upload correspondente ao codUser
    const upload = await Upload.findOne({ codUser });

    if (!upload) {
      res
        .status(404)
        .json({ message: "Nenhuma imagem encontrada para este codUser ." });
      return;
    }

    // Construir a URL completa da imagem
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      upload.logotipo
    }`;

    // Retornar a URL da imagem
    res.status(200).json({
      message: "Imagem encontrada com sucesso.",
      logotipo: imageUrl, // Retorna a URL completa da imagem
    });
  } catch (error) {
    next(error);
  }
};
