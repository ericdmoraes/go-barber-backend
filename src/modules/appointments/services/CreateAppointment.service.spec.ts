import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import AppError from '@shared/errors/app.error';
import CreateAppointmentService from './CreateAppointment.service';

describe('Create Appointment Service', () => {
  it('should be able to create an appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.run({
      date: new Date(),
      providerId: '123123213',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123213');
  });

  it('should not be able to create an appointment on the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.run({
      date: appointmentDate,
      providerId: '123123213',
    });

    await expect(
      createAppointment.run({
        date: appointmentDate,
        providerId: '123123213',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
