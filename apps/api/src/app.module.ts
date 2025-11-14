/*
 * ZeaZChain API Server
 * Author: ZeaZDev Meta-Intelligence
 * Root application module.
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { DefiModule } from './modules/defi/defi.module';
import { FintechModule } from './modules/fintech/fintech.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true, // Not for production!
    }),
    AuthModule,
    DefiModule,
    FintechModule,
  ],
})
export class AppModule {}
