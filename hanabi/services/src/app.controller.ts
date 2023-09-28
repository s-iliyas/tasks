import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // health check function to check whether server is running or not
  @Get()
  healthCheck(): string {
    return 'Server running...';
  }
}
