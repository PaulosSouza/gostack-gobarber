import IMailProvider from '../models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private messages: string[] = [];

  public async sendMail(message: string): Promise<void> {
    this.messages.push(message);
  }
}
