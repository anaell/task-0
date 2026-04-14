import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { GenderizeController } from './genderize/genderize/genderize.controller';
import { GenderizeModule } from './genderize/genderize/genderize.module';

@Module({
  imports: [GenderizeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
