-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_product" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "discount_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "discount_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(0) DEFAULT CURRENT_TIMESTAMP,
    "discount_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "discount_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discount_product_discount_id_product_id_key" ON "discount_product"("discount_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "discount_category_discount_id_category_id_key" ON "discount_category"("discount_id", "category_id");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_product" ADD CONSTRAINT "discount_product_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_product" ADD CONSTRAINT "discount_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_category" ADD CONSTRAINT "discount_category_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount_category" ADD CONSTRAINT "discount_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
