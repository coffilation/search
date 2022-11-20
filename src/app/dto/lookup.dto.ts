import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum OSMType {
  Node = `node`,
  Way = `way`,
  Relation = `relation`,
}

export class LookupQueryDto {
  @IsEnum(OSMType)
  osmType: OSMType;

  @IsNumber()
  @Type(() => Number)
  osmId: number;

  @IsString()
  category: string;
}
