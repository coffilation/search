import {
  isLatitude,
  isLongitude,
  IsNotEmpty,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@ValidatorConstraint({ name: `viewbox`, async: false })
export class ViewBox implements ValidatorConstraintInterface {
  private errorTemplate = (index: number, valueName: string) =>
    `$property[${index}] must be a ${valueName} string or number`;
  private indexModToProperty = [`longitude`, `latitude`];

  validate(coords: string) {
    const array = coords?.split?.(`,`);

    return !!(
      Array.isArray(array) &&
      array.length === 4 &&
      array.every((value, index) => [isLongitude, isLatitude][index % 2](value))
    );
  }

  defaultMessage({ value }: ValidationArguments) {
    const array = value?.split?.(`,`);
    const ARRAY_LENGTH = 4;

    if (!Array.isArray(array) || array.length !== ARRAY_LENGTH) {
      return `$property must be comma-separated array of four values like 29.608218,60.049997,30.694038,59.760964`;
    }

    for (let index = 0; index < ARRAY_LENGTH; index++) {
      const indexMod = index % 2;
      const value = array[index];

      if (![isLongitude, isLatitude][indexMod](value)) {
        return this.errorTemplate(index, this.indexModToProperty[indexMod]);
      }
    }

    return `$property must be four comma-separated values like 29.608218,60.049997,30.694038,59.760964`;
  }
}

export class SearchQueryDto {
  @IsString()
  q: string;

  @Validate(ViewBox)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Format: \`x1,y1,x2,y2\`. \`x\` is longitude, \`y\` is latitude`,
  })
  viewbox: string;
}
