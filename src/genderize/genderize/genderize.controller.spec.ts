import { Test, TestingModule } from '@nestjs/testing';
import { GenderizeController } from './genderize.controller';

describe('GenderizeController', () => {
  let controller: GenderizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenderizeController],
    }).compile();

    controller = module.get<GenderizeController>(GenderizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
