import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

const CACHE_TTL = 60 * 60 * 24;

@Module({
  imports: [HttpModule, CacheModule.register({ ttl: CACHE_TTL, max: 1000 })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
