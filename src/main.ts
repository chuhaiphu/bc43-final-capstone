import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { GlobalExceptionFilter } from './_filters /global-exception.filter';
import { ResponseInterceptor } from './ _interceptors/response.interceptor';
import { PrismaExceptionFilter } from './_filters /prisma-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalFilters(new GlobalExceptionFilter(), new PrismaExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Node43 Final Capstone')
    .setDescription('Movie Ticket Booking')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(8080)
}
bootstrap()