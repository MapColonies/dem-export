import { Logger } from '@map-colonies/js-logger';
import { IJobResponse } from '@map-colonies/mc-priority-queue';
import { inject, injectable } from 'tsyringe';
import httpStatus from 'http-status-codes';
import { JobManagerWrapper } from '../../clients/jobManagerWrapper';
import { AppError } from '../../common/appError';
import { SERVICES } from '../../common/constants';
import { IJobParameters, IJobStatusResponse, ITaskParameters } from '../../common/interfaces';

@injectable()
export class StatusManager {
  public constructor(
    @inject(SERVICES.LOGGER) private readonly logger: Logger,
    @inject(JobManagerWrapper) private readonly jobManagerClient: JobManagerWrapper,
  ) {}

  public async getStatus(jobID: string): Promise<IJobStatusResponse> {
    this.logger.info('logging');
    const job: IJobResponse<IJobParameters, ITaskParameters> | undefined = await this.jobManagerClient.getJob(jobID);
    if (job == undefined) {
      throw new AppError('', httpStatus.NOT_FOUND, 'The Job ID does not exist!', true);
    }
    const jobResponse: IJobStatusResponse = {
      percentage: job.percentage,
      status: job.status
    };
    return jobResponse;
  }
}
