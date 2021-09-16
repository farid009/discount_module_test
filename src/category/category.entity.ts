import { Discount } from '@src/discount/discount.entity';
import { Product } from '@src/product/product.entity';
import { CustomBaseEntity } from '@src/shared/entity';
import { Id } from '@src/shared/types';

export class Category extends CustomBaseEntity {
  name!: string;
  parentId!: Id;
  parentCategory?: Category;
  subCategories!: Category[];
  products!: Product[];
  discounts!: Discount[];
}
