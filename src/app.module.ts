import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { CatsModule } from './cats/cats.module';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
TypeOrmModule.forRoot({ 
    type:'postgres',
    host:process.env.POSTGRES_HOST,
    port:parseInt(process.env.POSTGRES_PORT),
    username:process.env.POSTGRES_USERNAME,
    password:process.env.POSTGRES_PASSWORD,
    database:process.env.POSTGRES_DATABASE,
    entities:[__dirname + '/**/*.entity{.ts,.js}'],
    synchronize:true
  }), CatsModule, BreedsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

