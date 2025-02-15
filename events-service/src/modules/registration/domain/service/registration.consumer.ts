import { CreateRegistrationDto } from '../model/create-registration.dto';

export interface RegistrationConsumer {
  processRegistration(subscription: CreateRegistrationDto): Promise<void>;
}

export const RegistrationConsumer = Symbol('RegistrationConsumer');
