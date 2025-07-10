/*
  Warnings:

  - You are about to drop the column `name` on the `Business` table. All the data in the column will be lost.
  - Added the required column `address` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyEmail` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteUrl` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Business` DROP COLUMN `name`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `companyEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `companyName` VARCHAR(191) NOT NULL,
    ADD COLUMN `fullName` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `websiteUrl` VARCHAR(191) NOT NULL;
