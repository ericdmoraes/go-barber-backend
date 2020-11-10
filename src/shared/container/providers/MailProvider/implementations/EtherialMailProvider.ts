// modules
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

// Models
import IMailTamplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

// DTOs
import ISendMailDTO from '../dtos/ISendMailDTO';

// Providers
import IMailProvider from '../models/IMailProviders';

@injectable()
export default class EtherialMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTamplateProvider,
  ) {
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

  async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const email = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe',
        address: from?.email || 'equipe@mail.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent %s', email.messageId);
    console.log('Preview url', nodemailer.getTestMessageUrl(email));
  }
}
