import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscountService } from './discount.service';
import { CheckDiscountReq } from './dto';

@Controller('v1/discounts')
@ApiTags('discounts')
export class DiscountController {
  constructor(private discountService: DiscountService) {}

  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @Post('check')
  async checkDiscount(
    @Body() checkDiscountReq: CheckDiscountReq,
  ): Promise<{ status: boolean; discountPercentage?: number }> {
    return await this.discountService.checkDiscount(
      checkDiscountReq.discountCode,
      checkDiscountReq.productId,
      checkDiscountReq.userId,
    );
  }
}
