import { CreateRegistrationDto } from '../model/create-registration.dto';

export interface RegistrationPublisher {
  registerSubscription(registration: CreateRegistrationDto): Promise<void>;
}

export const RegistrationPublisher = Symbol('RegistrationPublisher');
