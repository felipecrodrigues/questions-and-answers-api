import { IsNumberString } from 'class-validator';

export class GetByIdParams {
  @IsNumberString()
  id: number;
}
