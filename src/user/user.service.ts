import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'prisma/prisma.service';
import { SignupDto } from 'src/auth/dtos/signup.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  async createUser(signupData: SignupDto) {
    const { email, password, fullname, phone } = signupData;

    // Check if email is in use
    const emailInUse = await this.prisma.user.findFirst({
      where: { EMAIL: email },
    })

    if (emailInUse) {
      throw new BadRequestException('Email already in use')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user document and save in PostgreSQL using Prisma
    const newUser = await this.prisma.user.create({
      data: {
        EMAIL: email,
        PASSWORD: hashedPassword,
        FULLNAME: fullname,
        PHONE: phone,
        ROLE: 'USER',
        REFRESH_TOKEN: '',
      },
    })

    const { PASSWORD, ...result } = newUser
    return result
  }

}
