import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { createResponseDtoData, updateDtoData } from './testData/user.testData';

// user service test suite
describe('UserService', () => {
  let service: UserService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get(UserService);
    prisma = module.get(PrismaService);
  });

  const testUsers = createResponseDtoData;
  it('return user form', () => {
    prisma.user.findUnique.mockResolvedValueOnce(testUsers);
    expect(service.findOne('iliyas')).resolves.toBe(testUsers);
  });

  it('create user form', () => {
    prisma.user.create.mockResolvedValueOnce(testUsers);
    expect(service.create(createResponseDtoData)).resolves.toBe(testUsers);
  });

  it('update user form', () => {
    prisma.user.update.mockResolvedValueOnce(testUsers);
    expect(service.update(updateDtoData)).resolves.toBe(testUsers);
  });
});
