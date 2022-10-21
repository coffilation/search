import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(`search`)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(`search`)
  search(@Query(`q`) query: string) {
    return this.appService.search(query);
  }
}
