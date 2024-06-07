-- CreateTable
CREATE TABLE "sales_order" (
    "sales_order_number" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL,
    CONSTRAINT "sales_order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sales_order_list" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item_no" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "so_number" TEXT NOT NULL,
    CONSTRAINT "sales_order_list_so_number_fkey" FOREIGN KEY ("so_number") REFERENCES "sales_order" ("sales_order_number") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_order_customerId_key" ON "sales_order"("customerId");
