import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { GlobalExceptionFilter } from './_filters /global-exception.filter';
import { ResponseInterceptor } from './ _interceptors/response.interceptor';
import { RolesGuard } from './_guards/role.guard';
import { JwtService } from '@nestjs/jwt';
import { PrismaExceptionFilter } from './_filters /prisma-exception.filter';


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
  await app.listen(8080)
}
bootstrap();