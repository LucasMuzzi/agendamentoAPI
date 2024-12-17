import ServiceType from "../models/serviceTypesModels";
import Schedule from "../models/scheduleModels";
import Upload from "../models/uploadsModel";
import fs from "fs";
import path from "path";

export class SettingsService {
  async createServiceType(nome: string, codUser: string) {
    const newServiceType = new ServiceType({ nome, codUser });
    await newServiceType.save();
    return newServiceType;
  }

  async getServiceTypes(codUser: string) {
    const serviceTypes = await ServiceType.find({ codUser });
    return serviceTypes;
  }

  async createSchedule(
    horarioInicio: string,
    horarioFim: string,
    intervalo: number,
    codUser: string
  ) {
    const schedule = this.generateSchedule(
      horarioInicio,
      horarioFim,
      intervalo
    );
    const existingSchedule = await Schedule.findOne({ codUser });

    if (existingSchedule) {
      existingSchedule.horarios = schedule;
      await existingSchedule.save();
      return { message: "Horários atualizados com sucesso.", schedule };
    } else {
      const newSchedule = new Schedule({ codUser, horarios: schedule });
      await newSchedule.save();
      return { message: "Novo horário criado com sucesso.", schedule };
    }
  }

  async getSchedule(codUser: string) {
    const schedule = await Schedule.findOne({ codUser });
    if (!schedule) {
      throw new Error("Nenhum horário encontrado para este codUser .");
    }
    return schedule;
  }

  async uploadImage(codUser: string, file: Express.Multer.File) {
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

      existingUpload.logotipo = file.filename;
      await existingUpload.save();
      return {
        message: "Imagem atualizada com sucesso!",
        logotipo: existingUpload.logotipo,
      };
    } else {
      const newUpload = new Upload({ codUser, logotipo: file.filename });
      await newUpload.save();
      return {
        message: "Imagem enviada e salva com sucesso!",
        logotipo: file.filename,
      };
    }
  }

  async getImage(codUser: string) {
    const upload = await Upload.findOne({ codUser });
    if (!upload) {
      throw new Error("Nenhuma imagem encontrada para este codUser .");
    }
    return upload;
  }

  async removeServiceType(id: string, codUser: string) {
    const deletedServiceType = await ServiceType.findOneAndDelete({
      _id: id,
      codUser,
    });
    if (!deletedServiceType) {
      throw new Error(
        "Tipo de serviço não encontrado ou você não tem permissão para removê-lo."
      );
    }
    return deletedServiceType;
  }

  private generateSchedule(
    start: string,
    end: string,
    interval: number
  ): string[] {
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
  }
}
