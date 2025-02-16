/*
  Warnings:

  - Changed the type of `event_id` on the `registrations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "registrations" DROP COLUMN "event_id",
ADD COLUMN     "event_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "registrations_user_id_event_id_idx" ON "registrations"("user_id", "event_id");

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
