// genderize.controller.ts
import {
  Controller,
  Get,
  Query,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GenderizeService } from './genderize.service';

@Controller('api')
export class GenderizeController {
  constructor(private readonly genderizeService: GenderizeService) {}

  @Get('classify')
  async classify(@Query('name') name: any) {
    // Input Validation logic for missing 'name' query parameter
    if (name === undefined || name === '') {
      throw new BadRequestException({
        status: 'error',
        message: 'Name query parameter is required',
      });
    }

    // Input Validation Logic for Wrong Input type
    if (typeof name !== 'string') {
      throw new UnprocessableEntityException({
        status: 'error',
        message: 'Name query parameter must be a string',
      });
    }

    // Call service (which now returns the fully processed object)
    return await this.genderizeService.processGenderData(name);
  }
}
