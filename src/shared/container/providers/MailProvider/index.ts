import { container } from 'tsyringe';

import IMailProvider from './models/IMailProvider';
import EtheralMailProvider from './implementations/EtherealMailProvider';

const providers = {
  ethereal: container.resolve(EtheralMailProvider),
};

container.registerInstance<IMailProvider>('MailProvider', providers.ethereal);
