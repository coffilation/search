import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { ResponseDto } from './dto/response.dto';

const defaultParams = {
  format: `jsonv2`,
  addressdetails: 1,
  'accept-language': `ru`,
  namedetails: 1,
  countrycodes: `ru`,
};

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  search(query: string): Observable<ResponseDto[]> {
    return this.httpService
      .get<ResponseDto[]>(`https://nominatim.openstreetmap.org/search`, {
        params: { q: query, ...defaultParams },
      })
      .pipe(map((response) => response.data));
  }
}
