import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscountModule } from './discount/discount.module';

@Module({
  imports: [DiscountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
