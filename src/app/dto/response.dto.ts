export class ResponseDto {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
  icon: string;
  address: {
    amenity: string;
    road: string;
    city_district: string;
    city?: string;
    town?: string;
    'ISO3166-2-lvl15': string;
    state: string;
    'ISO3166-2-lvl4': string;
    region: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  namedetails: {
    name: string;
  };
}
