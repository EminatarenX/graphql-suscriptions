/*
  Warnings:

  - You are about to drop the column `events` on the `Webhook` table. All the data in the column will be lost.
  - Added the required column `event` to the `Webhook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Webhook` DROP COLUMN `events`,
    ADD COLUMN `event` ENUM('PROFILE_VIEW', 'POST_LIKED', 'POST_COMMENTED') NOT NULL;
