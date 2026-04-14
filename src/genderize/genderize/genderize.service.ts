// genderize.service.ts
import {
  Injectable,
  InternalServerErrorException,
  BadGatewayException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class GenderizeService {
  async processGenderData(name: string) {
    try {
      // Fetch request to genderize.io
      const response = await fetch(`https://api.genderize.io?name=${name}`);

      // If request was not okay sent the bad gateway (502) as response
      if (!response.ok) {
        throw new BadGatewayException({
          status: 'error',
          message: 'External API error',
        });
      }

      // Extract the raw data from the response
      const raw = await response.json();

      // Handle Genderize edge cases
      if (raw.gender === null || raw.count === 0) {
        throw new NotFoundException({
          status: 'error',
          message: 'No prediction available for the provided name',
        });
      }

      // Is_confident logic
      const is_confident = raw.probability >= 0.7 && raw.count >= 100;

      return {
        status: 'success',
        data: {
          name: raw.name,
          gender: raw.gender,
          probability: raw.probability,
          sample_size: raw.count, // Renamed as per requirements
          is_confident: is_confident,
          processed_at: new Date().toISOString(), // UTC ISO 8601
        },
      };
    } catch (error: any) {
      // If it's already a NestJS error that was thrown above, re-throw it
      if (error.getResponse) throw error;

      // Otherwise, it's an unexpected code error
      throw new InternalServerErrorException({
        status: 'error',
        message: error.message,
      });
    }
  }
}
