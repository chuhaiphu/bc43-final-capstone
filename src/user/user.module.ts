import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/_constants/jwt.constant';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: jwtConstants.secret }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAILER_HOST,
          port: parseInt(process.env.MAILER_PORT, 10),
          secure: true,
          auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_APP_PASSWORD,
          },
        },
        defaults: {
          from: `"NODE43 Support" <${process.env.MAILER_EMAIL}>`,
        },
        template: {
          dir: process.cwd() + '/src/_templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService]
})
export class UserModule { }
