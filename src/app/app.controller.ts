import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';

@ApiTags(`search`)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(`search`)
  search(@Query(`q`) query: string, @Req() request: FastifyRequest) {
    return this.appService.search(query, request);
  }
}
