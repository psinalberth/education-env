import { CreateRegistrationDto } from '../model/create-registration.dto';
import { RegistrationDto } from '../model/registration.dto';

export interface RegistrationRepository {
  save(request: CreateRegistrationDto): Promise<RegistrationDto>;

  findAll(userId: number): Promise<RegistrationDto[]>;

  findByUserIdAndExamId(
    userId: number,
    examId: string,
  ): Promise<RegistrationDto | null>;
}

export const RegistrationRepository = Symbol('RegistrationRepository');
