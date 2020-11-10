import IParseMailTemplate from '../dtos/IParseMailTemplate';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateMailProvider
  implements IMailTemplateProvider {
  async parse({ template }: IParseMailTemplate): Promise<string> {
    return template;
  }
}
