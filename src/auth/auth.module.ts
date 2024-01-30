import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
//import { jwtConstants } from './constants/jwt.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[UsersModule,    JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>("SECRET_JWT"),
      signOptions: { expiresIn: "1d" },
      global: true,
    }),
    inject: [ConfigService],
  }),],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule]
})
export class AuthModule {}
