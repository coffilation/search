import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { SearchQueryDto } from 'app/dto/search.dto';

@ApiTags(`search`)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(`search`)
  search(@Query() query: SearchQueryDto, @Req() request: FastifyRequest) {
    return this.appService.search(query, request);
  }
}
