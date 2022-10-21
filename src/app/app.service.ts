import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Place } from 'app/entities/place.entity';

const defaultParams = {
  format: `jsonv2`,
  addressdetails: 1,
  'accept-language': `ru`,
  countrycodes: `ru`,
};

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async fetchDataWithCache(query: string): Promise<Place[]> {
    const cache = await this.cacheManager.get<Place[] | undefined>(query);

    if (cache) {
      return cache;
    }

    const { data } = await lastValueFrom(
      this.httpService.get<Place[]>(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: { q: query, ...defaultParams },
        },
      ),
    );

    await this.cacheManager.set(query, data);

    return data;
  }

  async search(query: string): Promise<Place[]> {
    return (await this.fetchDataWithCache(query)).map(
      (entity) => new Place(entity),
    );
  }
}
