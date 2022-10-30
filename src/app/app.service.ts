import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Place } from 'app/entities/place.entity';
import { FastifyRequest } from 'fastify';
import { SearchQueryDto } from 'app/dto/search.dto';

const defaultParams = {
  format: `jsonv2`,
  addressdetails: 1,
  'accept-language': `ru`,
  countrycodes: `ru`,
  bounded: 1,
};

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async fetchDataWithCache(
    query: SearchQueryDto,
    referer?: string,
  ): Promise<Place[]> {
    const cacheKey = Object.values(query).join(``);
    const cache = await this.cacheManager.get<Place[] | undefined>(cacheKey);

    if (cache) {
      return cache;
    }

    const { data } = await lastValueFrom(
      this.httpService.get<Place[]>(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: { ...query, ...defaultParams },
          headers: { referer },
        },
      ),
    );

    await this.cacheManager.set(cacheKey, data);

    return data;
  }

  async search(query: SearchQueryDto, request: FastifyRequest) {
    return (await this.fetchDataWithCache(query, request.headers.referer)).map(
      (entity) => new Place(entity),
    );
  }
}
