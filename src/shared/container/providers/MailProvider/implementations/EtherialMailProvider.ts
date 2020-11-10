// Interfaces
import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProviders';

export default class EtherialMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async sendMail(to: string, body: string): Promise<void> {
    const email = await this.client.sendMail({
      from: 'Equipe <equipe@example.com>',
      to,
      subject: 'Pass Recover',
      text: body,
    });

    console.log('Message sent %s', email.messageId);
    console.log('Preview url', nodemailer.getTestMessageUrl(email));
  }
}
