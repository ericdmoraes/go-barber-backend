import IParseTemplate from '../dtos/IParseMailTemplate';

export default interface IMailTemplateProvider {
  parse(data: IParseTemplate): Promise<string>;
}
