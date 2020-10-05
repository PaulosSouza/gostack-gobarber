import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface ITemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
