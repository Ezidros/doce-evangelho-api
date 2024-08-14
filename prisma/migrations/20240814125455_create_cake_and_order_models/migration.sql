-- CreateTable
CREATE TABLE "cakes" (
    "id" TEXT NOT NULL,
    "flavor" TEXT NOT NULL,
    "filling" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "number_of_cakes_sold" TEXT,
    "is_special_flavor" BOOLEAN DEFAULT false,
    "is_solded" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cakes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "benefit" TEXT NOT NULL,
    "revenue" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
