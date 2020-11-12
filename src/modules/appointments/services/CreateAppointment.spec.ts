import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import AppError from '@shared/errors/app.error';
import CreateAppointmentService from './CreateAppointment.service';

// Globals
// repositories
let fakeAppointmentsRepository: FakeAppointmentsRepository;

// services
let createAppointmentService: CreateAppointmentService;

describe('Create Appointment Service', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create an appointment', async () => {
    const appointment = await createAppointmentService.run({
      date: new Date(),
      providerId: '123123213',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123213');
  });

  it('should not be able to create an appointment on the same date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.run({
      date: appointmentDate,
      providerId: '123123213',
    });

    await expect(
      createAppointmentService.run({
        date: appointmentDate,
        providerId: '123123213',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
