import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtContants } from './auth.constants';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JwtContants.secret,
      signOptions: { expiresIn: parseInt('1000') },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
