// index, show, create, update, delete

import { Request, Response } from 'express';

import { parseISO } from 'date-fns';

// Dependency Injection
import { container } from 'tsyringe';

// Services
import CreateAppointmentService from '@modules/appointments/services/CreateAppointment.service';

export default class AppointmentsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { provider_id: providerId, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.run({
      date: parsedDate,
      providerId,
    });

    return res.json(appointment);
  }
}
