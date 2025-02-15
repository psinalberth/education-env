import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegistrationService } from '../../domain/service/registration.service';
import { RegistrationResponseDto } from './registration-response.dto';
import { RegistrationDto } from '../../domain/model/registration.dto';
import { CreateRegistrationRequest } from './create-registration-request';

@ApiTags('Registrations')
@Controller('registrations')
export class RegistrationController {
  constructor(@Inject() private readonly service: RegistrationService) {}

  @Get()
  @ApiOperation({ summary: "Lists user's registrations" })
  @ApiHeader({
    name: 'userId',
    description: 'Current user logged in',
    required: true,
  })
  @ApiResponse({ type: RegistrationResponseDto, isArray: true })
  async findAll(@Headers('userId') userId: string, @Res() response: Response) {
    await this.service
      .findAll(Number.parseInt(userId))
      .then((subs) => subs.map((sub) => this.mapToDto(sub)))
      .then((result) => response.status(HttpStatus.OK).send(result));
  }

  @Post()
  @ApiOperation({ summary: 'Registers to attend event' })
  @ApiHeader({
    name: 'userId',
    description: 'Current user logged in',
    required: true,
  })
  @ApiHeader({
    name: 'userEmail',
    description: 'Email for current user logged in',
    required: true,
  })
  @ApiCreatedResponse({ type: RegistrationResponseDto })
  async register(
    @Headers('userId') userId: string,
    @Headers('userEmail') userEmail: string,
    @Body() request: CreateRegistrationRequest,
    @Res() response: Response,
  ) {
    await this.service
      .registerSubscription({ userId, userEmail, ...request })
      .then((result) => this.mapToDto(result))
      .then((sub) => response.status(HttpStatus.CREATED).send(sub));
  }

  private mapToDto(registration: RegistrationDto): RegistrationResponseDto {
    return { ...registration } as RegistrationResponseDto;
  }
}
