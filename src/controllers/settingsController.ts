// controllers/SettingsController.ts
import { Request, Response, NextFunction } from "express";
import { SettingsService } from "../service/settingsService";

export class SettingsController {
  private settingsService: SettingsService;

  constructor() {
    this.settingsService = new SettingsService();
  }

  public createServiceType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { nome, codUser } = req.body;

      if (!nome || !codUser) {
        res
          .status(400)
          .json({
            message: "O nome do serviço e o codUser  são obrigatórios.",
          });
        return;
      }

      const newServiceType = await this.settingsService.createServiceType(
        nome,
        codUser
      );
      res.status(201).json(newServiceType);
    } catch (error) {
      next(error);
    }
  };

  public getServiceTypes = async (
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

      const serviceTypes = await this.settingsService.getServiceTypes(codUser);
      res.status(200).json(serviceTypes);
    } catch (error) {
      next(error);
    }
  };

  public createSchedule = async (
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

      const { message, schedule } = await this.settingsService.createSchedule(
        horarioInicio,
        horarioFim,
        intervalNumber,
        codUser
      );

      res.status(200).json({ message, schedule, codUser });
    } catch (error) {
      next(error);
    }
  };

  public getSchedule = async (
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

      const schedule = await this.settingsService.getSchedule(codUser);
      res.status(200).json(schedule);
    } catch (error) {
      next(error);
    }
  };

  public uploadImage = async (
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

      const { message, logotipo } = await this.settingsService.uploadImage(
        codUser,
        req.file
      );
      res.status(200).json({ message, logotipo });
    } catch (error) {
      next(error);
    }
  };

  public getImage = async (
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

      const upload = await this.settingsService.getImage(codUser);
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

  public removeServiceType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id, codUser } = req.body;

      if (!id || !codUser) {
        res.status(400).json({
          message: "O ID do serviço e o codUser   são obrigatórios.",
        });
        return;
      }

      const deletedServiceType = await this.settingsService.removeServiceType(
        id,
        codUser
      );
      res.status(200).json({
        message: "Tipo de serviço removido com sucesso.",
        deletedServiceType,
      });
    } catch (error) {
      next(error);
    }
  };
}
