/*
  Warnings:

  - Added the required column `cake_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "cake_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cake_id_fkey" FOREIGN KEY ("cake_id") REFERENCES "cakes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
