import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/shared/modules/prisma-management/prisma.module';
import { DiscountController } from './discount.controller';
import { discountProviders } from './discount.provider';

@Module({
  imports: [PrismaModule],
  controllers: [DiscountController],
  providers: discountProviders,
  exports: discountProviders,
})
export class DiscountModule {}
