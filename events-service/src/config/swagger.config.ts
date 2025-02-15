import { EventModule } from '@modules/event/event.module';
import { RegistrationModule } from '@modules/registration/adapter/config/registration.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function configSwagger(app: INestApplication<any>) {
  const options = new DocumentBuilder()
    .setTitle('Events and Registration Service')
    .setDescription(
      'This service is responsible for events management and user registration to attend them',
    )
    .addTag('Events', 'Responsible for events management for admins')
    .addTag('Registrations', 'Responsible for user registrations management')
    .setVersion('1.0.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, options, {
      include: [RegistrationModule, EventModule],
    });

  SwaggerModule.setup('docs', app, documentFactory);
}
