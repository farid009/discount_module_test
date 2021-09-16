import { Id } from '@src/shared/types';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CheckDiscountReq {
  @IsNotEmpty()
  @IsString()
  discountCode!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  productId!: Id;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId!: Id;
}
