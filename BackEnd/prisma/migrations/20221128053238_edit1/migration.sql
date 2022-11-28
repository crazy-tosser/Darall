-- DropForeignKey
ALTER TABLE "ProductTag" DROP CONSTRAINT "ProductTag_productId_fkey";

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
