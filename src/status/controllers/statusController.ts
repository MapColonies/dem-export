import { Logger } from '@map-colonies/js-logger';
import { RequestHandler } from 'express';
import httpStatus from 'http-status-codes';
import { injectable, inject } from 'tsyringe';
import { SERVICES } from '../../common/constants';
import { IJobStatusResponse, JobStatusParams } from '../../common/interfaces';
import { StatusManager } from '../models/statusManager';

type GetStatusHandler = RequestHandler<JobStatusParams, IJobStatusResponse>;

@injectable()
export class StatusController {

  public constructor(
    @inject(SERVICES.LOGGER) private readonly logger: Logger,
    @inject(StatusManager) private readonly manager: StatusManager,
  ) {}

  public getStatus: GetStatusHandler = async (req, res) => {
    const { jobID } = req.params;
    return res.status(httpStatus.OK).json(await this.manager.getStatus(jobID));
  };
}
