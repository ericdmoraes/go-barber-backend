interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariables;
}
