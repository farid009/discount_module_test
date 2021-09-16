import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seed = async () => {
  const mainCategory = await prisma.category.create({
    data: { title: 'لوازم الکتریک' },
  });
  const subCategory = await prisma.category.create({
    data: { title: 'تلفن همراه' },
  });
  const product = await prisma.product.create({
    data: {
      name: 'galaxy s3',
      price: 120000,
      categoryId: subCategory.id,
    },
  });
  const discount1 = await prisma.discount.create({
    data: {
      code: 'code1',
      percentage: 20,
    },
  });
  const discount2 = await prisma.discount.create({
    data: {
      code: 'code2',
      percentage: 10,
    },
  });

  await prisma.discountProduct.create({
    data: {
      productId: product.id,
      discountId: discount1.id,
    },
  });
  await prisma.discountCategory.create({
    data: {
      categoryId: subCategory.id,
      discountId: discount2.id,
    },
  });
};

export async function main() {
  await seed();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
