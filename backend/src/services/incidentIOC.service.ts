import { withTransaction } from "../database/transaction";

import {
  createIncidentIOCRepository,
  getIncidentIOCsRepository,
  getIOCIncidentsRepository,
  getIncidentIOCLinkRepository,
  unlinkIOCRepository,
} from "../repositories/incidentIOC.repository";

import {
  getIncidentByIdRepository,
} from "../repositories/incident.repository";

import {
  getIOCByIdRepository,
} from "../repositories/ioc.repository";

import {
  createTimelineEntryRepository,
} from "../repositories/incidentTimeline.repository";

import {
  TimelineAction,
} from "@prisma/client";

import { NotFoundError } from "../errors/NotFoundError";
import { ConflictError } from "../errors/ConflictError";

type LinkIOCServiceInput = {
  incidentId: string;
  iocId: string;
  linkedById: string;
  notes?: string;
};


export const linkIOCToIncidentService = async (
  input: LinkIOCServiceInput,
) => {
  return withTransaction(async (tx) => {
    const incident = await getIncidentByIdRepository(
      input.incidentId,
      tx,
    );

    if (!incident) {
      throw new NotFoundError("Incident not found");
    }

    const ioc = await getIOCByIdRepository(
      input.iocId,
      tx,
    );

    if (!ioc) {
      throw new NotFoundError("IOC not found");
    }

    const existingLink =
      await getIncidentIOCLinkRepository(
        input.incidentId,
        input.iocId,
        tx,
      );

    if (existingLink) {
      throw new ConflictError(
        "IOC is already linked to this incident",
      );
    }

    const link =
      await createIncidentIOCRepository(
        input,
        tx,
      );

    await createTimelineEntryRepository(
      {
        incidentId: input.incidentId,
        userId: input.linkedById,
        action: TimelineAction.IOC_LINKED,
        description: `IOC "${ioc.value}" linked to incident.`,
      },
      tx,
    );

    return link;
  });
};

export const getIncidentIOCsService = async (
  incidentId: string,
) => {
  return getIncidentIOCsRepository(incidentId);
};

export const getIOCIncidentsService = async (
  iocId: string,
) => {
  return getIOCIncidentsRepository(iocId);
};

export const unlinkIOCFromIncidentService = async (
  incidentId: string,
  iocId: string,
) => {
  return withTransaction(async (tx) => {
    const existingLink =
      await getIncidentIOCLinkRepository(
        incidentId,
        iocId,
        tx,
      );

    if (!existingLink) {
      throw new NotFoundError(
        "IOC link not found",
      );
    }

    await unlinkIOCRepository(
      incidentId,
      iocId,
      tx,
    );

    await createTimelineEntryRepository(
      {
        incidentId,
        userId: existingLink.linkedById,
        action: TimelineAction.IOC_UNLINKED,
        description: "IOC unlinked from incident.",
      },
      tx,
    );
  });
};