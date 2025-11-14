import { Module } from '@nestjs/common';
import { WorldIDService } from './world-id.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [WorldIDService],
  controllers: [AuthController],
})
export class AuthModule {}
