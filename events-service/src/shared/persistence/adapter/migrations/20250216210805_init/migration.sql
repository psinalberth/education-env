/*
  Warnings:

  - You are about to drop the column `exam_id` on the `registrations` table. All the data in the column will be lost.
  - Added the required column `event_id` to the `registrations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "registrations_exam_id_idx";

-- DropIndex
DROP INDEX "registrations_exam_id_user_id_idx";

-- AlterTable
ALTER TABLE "registrations" DROP COLUMN "exam_id",
ADD COLUMN     "event_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "registrations_user_id_event_id_idx" ON "registrations"("user_id", "event_id");
