import { Module } from '@nestjs/common';
import { GenderizeController } from './genderize.controller';
import { GenderizeService } from './genderize.service';

@Module({
  controllers: [GenderizeController],
  providers: [GenderizeService],
  exports: [GenderizeService],
})
export class GenderizeModule {}
