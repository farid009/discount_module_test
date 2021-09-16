import { Category } from '@src/category/category.entity';
import { Discount } from '@src/discount/discount.entity';
import { CustomBaseEntity } from '@src/shared/entity';
import { Id } from '@src/shared/types';

export class Product extends CustomBaseEntity {
  name!: string;
  price!: number;
  categoryId!: Id;
  category?: Category;
  discounts!: Discount[];
}
