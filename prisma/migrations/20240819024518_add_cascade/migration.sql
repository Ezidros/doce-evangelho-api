-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_cake_id_fkey";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cake_id_fkey" FOREIGN KEY ("cake_id") REFERENCES "cakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
