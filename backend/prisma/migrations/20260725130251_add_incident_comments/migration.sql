-- CreateTable
CREATE TABLE "IncidentComment" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IncidentComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IncidentComment_incidentId_idx" ON "IncidentComment"("incidentId");

-- CreateIndex
CREATE INDEX "IncidentComment_userId_idx" ON "IncidentComment"("userId");

-- CreateIndex
CREATE INDEX "IncidentComment_createdAt_idx" ON "IncidentComment"("createdAt");

-- CreateIndex
CREATE INDEX "IncidentComment_incidentId_createdAt_idx" ON "IncidentComment"("incidentId", "createdAt");

-- AddForeignKey
ALTER TABLE "IncidentComment" ADD CONSTRAINT "IncidentComment_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentComment" ADD CONSTRAINT "IncidentComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
