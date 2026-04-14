import { Test, TestingModule } from '@nestjs/testing';
import { GenderizeService } from './genderize.service';

describe('GenderizeService', () => {
  let service: GenderizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenderizeService],
    }).compile();

    service = module.get<GenderizeService>(GenderizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
