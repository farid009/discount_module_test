import { Injectable } from '@nestjs/common';
import { isNil } from '@src/shared/helpers';
import { PrismaService } from '@src/shared/modules/prisma-management/prisma.service';
import { Id } from '@src/shared/types';
import { Discount } from './discount.entity';

@Injectable()
export class DiscountService {
  constructor(private prismaService: PrismaService) {}
  async checkDiscount(
    discountCode: string,
    productId: Id,
    userId: Id,
  ): Promise<{ status: boolean; discountPercentage?: number }> {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
      },
    });
    const productCategoryId = product.categoryId;
    const productCategoryParentId = product.category?.parentId;
    let { discount: firstOrderDiscount } =
      (await this.prismaService.discountProduct.findFirst({
        select: { discount: true },
        where: {
          discount: {
            code: discountCode,
          },
          productId: productId,
        },
      })) || { discount: null };

    if (firstOrderDiscount) {
      return {
        status: true,
        discountPercentage: firstOrderDiscount.percentage,
      };
    } else {
      let secondOrderDiscount: Discount;
      const secondOrderDiscountsWithCategories =
        await this.prismaService.discountCategory.findMany({
          select: { discount: true, category: true },
          where: {
            discount: {
              code: discountCode,
            },
            categoryId: {
              in: productCategoryParentId
                ? [productCategoryId, productCategoryParentId]
                : [productCategoryId],
            },
          },
        });

      if (secondOrderDiscountsWithCategories.length === 0) {
        return {
          status: false,
        };
      }
      if (secondOrderDiscountsWithCategories.length === 1) {
        secondOrderDiscount = secondOrderDiscountsWithCategories[0].discount;
      } else {
        secondOrderDiscount = isNil(
          secondOrderDiscountsWithCategories[0].category?.parentId,
        )
          ? secondOrderDiscountsWithCategories[0].discount
          : secondOrderDiscountsWithCategories[1].discount;
      }
      return {
        status: true,
        discountPercentage: secondOrderDiscount.percentage,
      };
    }
  }
}
