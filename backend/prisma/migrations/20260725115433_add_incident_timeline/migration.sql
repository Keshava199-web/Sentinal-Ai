-- CreateEnum
CREATE TYPE "TimelineAction" AS ENUM ('CREATED', 'ASSIGNED', 'STATUS_CHANGED', 'COMMENT_ADDED', 'EVIDENCE_UPLOADED', 'REOPENED', 'CLOSED');

-- CreateTable
CREATE TABLE "IncidentTimeline" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "userId" TEXT,
    "action" "TimelineAction" NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncidentTimeline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IncidentTimeline_incidentId_idx" ON "IncidentTimeline"("incidentId");

-- CreateIndex
CREATE INDEX "IncidentTimeline_createdAt_idx" ON "IncidentTimeline"("createdAt");

-- CreateIndex
CREATE INDEX "IncidentTimeline_action_idx" ON "IncidentTimeline"("action");

-- CreateIndex
CREATE INDEX "IncidentTimeline_incidentId_createdAt_idx" ON "IncidentTimeline"("incidentId", "createdAt");

-- AddForeignKey
ALTER TABLE "IncidentTimeline" ADD CONSTRAINT "IncidentTimeline_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentTimeline" ADD CONSTRAINT "IncidentTimeline_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
