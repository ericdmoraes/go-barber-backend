import IMailProvider from '../models/IMailProviders';

interface Message {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: Message[] = [];

  async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
    });
  }
}
