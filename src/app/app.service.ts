import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Place } from 'app/entities/place.entity';
import { FastifyRequest } from 'fastify';
import { SearchQueryDto } from 'app/dto/search.dto';
import { LookupQueryDto } from 'app/dto/lookup.dto';

const defaultParams = {
  format: `jsonv2`,
  addressdetails: 1,
  'accept-language': `ru`,
  countrycodes: `ru`,
  bounded: 1,
};

const defaultFindOneParams = {
  format: `jsonv2`,
  addressdetails: 1,
  'accept-language': `ru`,
};

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async fetchDataWithCache(
    query: SearchQueryDto,
    referer?: string,
  ): Promise<Place[]> {
    const headers: Record<string, string> = {};

    if (referer) {
      headers.referer = referer;
    }

    const { data } = await lastValueFrom(
      this.httpService.get<Place[]>(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: { ...query, ...defaultParams },
          headers,
        },
      ),
    );

    return data;
  }

  async search(query: SearchQueryDto, request: FastifyRequest) {
    return (await this.fetchDataWithCache(query, request.headers.referer)).map(
      (entity) => new Place(entity),
    );
  }

  private osmTypeToPrefix = { node: `N`, way: `W`, relation: `R` };

  async lookup(
    { osmType, osmId, category }: LookupQueryDto,
    request: FastifyRequest,
  ) {
    const headers: Record<string, string> = {};

    if (request.headers.referer) {
      headers.referer = request.headers.referer;
    }

    const { data } = await lastValueFrom(
      this.httpService.get<Place[]>(
        `https://nominatim.openstreetmap.org/lookup`,
        {
          params: {
            osm_ids: `${this.osmTypeToPrefix[osmType]}${osmId}`,
            ...defaultFindOneParams,
          },
          headers,
        },
      ),
    );

    const place = data.find((place) => place.category === category);

    if (!place) {
      throw new NotFoundException();
    }

    return new Place(place);
  }
}
