import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { createDtoData, createResponseDtoData } from './testData/user.testData';
import { PrismaService } from '../prisma/prisma.service';

// Create a mock UserService for testing
const userServiceMock = {
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
};

const prismaServiceMock = {
  user: {
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
  },
};

// user controller test suite
describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userDto: UserDto = createDtoData;

      const createServiceResult = createResponseDtoData;

      // Mock the UserService create method
      userServiceMock.create.mockResolvedValue(createServiceResult);

      // Call the create method and assert the result
      const result = await controller.create(userDto);
      expect(result).toEqual(createResponseDtoData);
    });

    it('should handle invalid date format', async () => {
      const userDto: UserDto = {
        ...createDtoData,
        dob: '66-66-9999',
      };

      // Call the create method with an invalid date format
      await expect(controller.create(userDto)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userDto: UserDto = createDtoData;

      // Mock the UserService update method
      userServiceMock.update.mockResolvedValue(createResponseDtoData);

      // Call the update method and assert the result
      const result = await controller.update(userDto);
      expect(result).toEqual(createResponseDtoData);
    });
  });

  describe('findOne', () => {
    it('should find a user', async () => {
      const username = 'testUsername';

      // Mock the UserService findOne method
      userServiceMock.findOne.mockResolvedValue(createResponseDtoData);

      // Call the findOne method and assert the result
      const result = await controller.findOne(username);
      expect(result).toEqual(createResponseDtoData);
    });

    it('should handle user not found', async () => {
      const username = 'nonexistentUsername';

      // Mock the UserService findOne method to return null
      userServiceMock.findOne.mockResolvedValue(null);

      // Call the findOne method with a non-existent username
      const result = await controller.findOne(username);
      expect(result).toEqual({ username });
    });
  });
});
