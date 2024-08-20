/*
  Warnings:

  - The `amount` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `benefit` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revenue` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "benefit",
ADD COLUMN     "benefit" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "revenue",
ADD COLUMN     "revenue" INTEGER NOT NULL DEFAULT 0;
