-- CreateEnum
CREATE TYPE "IOCType" AS ENUM ('IP', 'DOMAIN', 'URL', 'EMAIL', 'SHA256', 'SHA1', 'MD5', 'FILE_NAME', 'CVE', 'MITRE_TECHNIQUE');

-- CreateEnum
CREATE TYPE "IOCSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "IOCStatus" AS ENUM ('ACTIVE', 'WHITELISTED', 'FALSE_POSITIVE', 'EXPIRED');

-- CreateEnum
CREATE TYPE "IOCSource" AS ENUM ('MANUAL', 'VIRUSTOTAL', 'ABUSEIPDB', 'OTX', 'MISP', 'WAZUH', 'SPLUNK', 'AI_ENGINE', 'OTHER');

-- CreateTable
CREATE TABLE "IOC" (
    "id" TEXT NOT NULL,
    "type" "IOCType" NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "severity" "IOCSeverity" NOT NULL,
    "confidence" INTEGER NOT NULL DEFAULT 50,
    "firstSeen" TIMESTAMP(3),
    "lastSeen" TIMESTAMP(3),
    "status" "IOCStatus" NOT NULL DEFAULT 'ACTIVE',
    "source" "IOCSource" NOT NULL DEFAULT 'MANUAL',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "IOC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncidentIOC" (
    "incidentId" TEXT NOT NULL,
    "iocId" TEXT NOT NULL,
    "linkedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "IncidentIOC_pkey" PRIMARY KEY ("incidentId","iocId")
);

-- CreateIndex
CREATE INDEX "IOC_firstSeen_idx" ON "IOC"("firstSeen");

-- CreateIndex
CREATE INDEX "IOC_lastSeen_idx" ON "IOC"("lastSeen");

-- CreateIndex
CREATE INDEX "IOC_type_idx" ON "IOC"("type");

-- CreateIndex
CREATE INDEX "IOC_value_idx" ON "IOC"("value");

-- CreateIndex
CREATE INDEX "IOC_type_value_idx" ON "IOC"("type", "value");

-- CreateIndex
CREATE INDEX "IOC_severity_idx" ON "IOC"("severity");

-- CreateIndex
CREATE INDEX "IOC_status_idx" ON "IOC"("status");

-- CreateIndex
CREATE INDEX "IOC_source_idx" ON "IOC"("source");

-- CreateIndex
CREATE INDEX "IOC_createdById_idx" ON "IOC"("createdById");

-- CreateIndex
CREATE INDEX "IOC_createdAt_idx" ON "IOC"("createdAt");

-- CreateIndex
CREATE INDEX "IOC_deletedAt_idx" ON "IOC"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "IOC_type_value_source_key" ON "IOC"("type", "value", "source");

-- CreateIndex
CREATE INDEX "IncidentIOC_iocId_idx" ON "IncidentIOC"("iocId");

-- CreateIndex
CREATE INDEX "IncidentIOC_linkedById_idx" ON "IncidentIOC"("linkedById");

-- CreateIndex
CREATE INDEX "IncidentIOC_createdAt_idx" ON "IncidentIOC"("createdAt");

-- CreateIndex
CREATE INDEX "IncidentIOC_incidentId_createdAt_idx" ON "IncidentIOC"("incidentId", "createdAt");

-- CreateIndex
CREATE INDEX "IncidentIOC_iocId_createdAt_idx" ON "IncidentIOC"("iocId", "createdAt");

-- AddForeignKey
ALTER TABLE "IOC" ADD CONSTRAINT "IOC_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentIOC" ADD CONSTRAINT "IncidentIOC_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentIOC" ADD CONSTRAINT "IncidentIOC_iocId_fkey" FOREIGN KEY ("iocId") REFERENCES "IOC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentIOC" ADD CONSTRAINT "IncidentIOC_linkedById_fkey" FOREIGN KEY ("linkedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
