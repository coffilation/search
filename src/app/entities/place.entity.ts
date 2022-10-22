import { Exclude, Expose } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { applyDecorators } from '@nestjs/common';

const ExposeNameWithApi = (name: string) =>
  applyDecorators(ApiModelProperty({ name }), Expose({ name }));

export class Address {
  constructor(entity: Address) {
    Object.assign(this, entity);
  }

  @ExposeNameWithApi(`isolatedDwelling`)
  isolated_dwelling?: string;

  @ExposeNameWithApi(`cityBlock`)
  city_block?: string;

  @ExposeNameWithApi(`houseNumber`)
  house_number?: string;

  @ExposeNameWithApi(`houseName`)
  house_name?: string;

  @ExposeNameWithApi(`manMade`)
  man_made?: string;

  @ExposeNameWithApi(`mountainPass`)
  mountain_pass?: string;

  @ExposeNameWithApi(`stateDistrict`)
  state_district?: string;

  @ExposeNameWithApi(`countryCode`)
  country_code?: string;

  @ExposeNameWithApi(`cityDistrict`)
  city_district?: string;

  amenity?: string;
  road?: string;
  district?: string;
  borough?: string;
  suburb?: string;
  subdivision?: string;
  hamlet?: string;
  croft?: string;
  neighbourhood?: string;
  allotments?: string;
  quarter?: string;
  residential?: string;
  farm?: string;
  farmyard?: string;
  industrial?: string;
  commercial?: string;
  retail?: string;
  emergency?: string;
  historic?: string;
  military?: string;
  natural?: string;
  landuse?: string;
  place?: string;
  railway?: string;
  aerialway?: string;
  boundary?: string;
  aeroway?: string;
  club?: string;
  craft?: string;
  leisure?: string;
  office?: string;
  shop?: string;
  tourism?: string;
  bridge?: string;
  tunnel?: string;
  waterway?: string;
  city?: string;
  town?: string;
  state?: string;
  village?: string;
  region?: string;
  postcode?: string;
  country?: string;
  municipality?: string;
}

export class Place {
  constructor(entity: Place) {
    entity.address = new Address(entity.address);

    Object.assign(this, entity);
  }

  @ExposeNameWithApi(`name`)
  get name(): string {
    return this.address[this.category];
  }

  @ApiHideProperty()
  @Exclude()
  place_id: number;

  @ApiHideProperty()
  @Exclude()
  licence: string;

  @ExposeNameWithApi(`osmType`)
  osm_type: string;

  @ExposeNameWithApi(`osmId`)
  osm_id: number;

  @ExposeNameWithApi(`boundingBox`)
  boundingbox: string[];

  @ExposeNameWithApi(`displayName`)
  display_name: string;

  @ApiHideProperty()
  @Exclude()
  place_rank: number;

  @ApiHideProperty()
  @Exclude()
  importance: number;

  @ApiHideProperty()
  @Exclude()
  icon: string;

  lat: string;
  lon: string;
  category: string;
  type: string;

  address: Address;
}
