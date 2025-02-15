import { MailOptions } from './mail-options';

export interface MailService {
  send(options: MailOptions): Promise<void>;
}

export const MailService = Symbol('MailService');
