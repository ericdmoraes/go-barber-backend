import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateMailProvider
  implements IMailTemplateProvider {
  async parse(): Promise<string> {
    return 'mail content';
  }
}
