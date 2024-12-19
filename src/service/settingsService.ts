import ServiceType from "../models/serviceTypesModels";
import Schedule from "../models/scheduleModels";

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
