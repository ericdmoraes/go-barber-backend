// DTOs
import ISendMailDTO from '../dtos/ISendMailDTO';

// Provices
import IMailProvider from '../models/IMailProviders';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
