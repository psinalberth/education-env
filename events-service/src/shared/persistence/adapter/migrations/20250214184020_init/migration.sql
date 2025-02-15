-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('CREATED', 'CANCELLED', 'CONFIRMED', 'FINISHED');

-- CreateTable
CREATE TABLE "registrations" (
    "registration_id" SERIAL NOT NULL,
    "exam_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("registration_id")
);

-- CreateTable
CREATE TABLE "resource_locks" (
    "lock_id" SERIAL NOT NULL,
    "resource" TEXT NOT NULL,
    "expiring_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resource_locks_pkey" PRIMARY KEY ("lock_id")
);

-- CreateTable
CREATE TABLE "exams" (
    "exam_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("exam_id")
);

-- CreateTable
CREATE TABLE "events" (
    "event_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'CREATED',
    "expected_registrations" INTEGER NOT NULL,
    "total_registrations" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("event_id")
);

-- CreateIndex
CREATE INDEX "registrations_user_id_idx" ON "registrations"("user_id");

-- CreateIndex
CREATE INDEX "registrations_exam_id_idx" ON "registrations"("exam_id");

-- CreateIndex
CREATE INDEX "registrations_exam_id_user_id_idx" ON "registrations"("exam_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "resource_locks_resource_key" ON "resource_locks"("resource");

-- CreateIndex
CREATE UNIQUE INDEX "exams_external_id_key" ON "exams"("external_id");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;
