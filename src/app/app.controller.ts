import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { SearchQueryDto } from 'app/dto/search.dto';
import { LookupQueryDto } from 'app/dto/lookup.dto';

@ApiTags(`search`)
@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(`search`)
  search(@Query() query: SearchQueryDto, @Req() request: FastifyRequest) {
    return this.appService.search(query, request);
  }

  @Get(`lookup`)
  lookup(@Query() query: LookupQueryDto, @Req() request: FastifyRequest) {
    return this.appService.lookup(query, request);
  }
}
