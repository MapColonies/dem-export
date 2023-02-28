import { Logger } from '@map-colonies/js-logger';
import { OperationStatus } from '@map-colonies/mc-priority-queue';
import { inject, injectable } from 'tsyringe';
import { JobManagerWrapper } from '../../clients/jobManagerWrapper';
import { SERVICES } from '../../common/constants';
import { CreateJobBody, IConfig, IConfigProvider, IExportResponse, ITaskParameters, Payload } from '../../common/interfaces';

@injectable()
export class ExportManager {
  public constructor(
    @inject(SERVICES.LOGGER) private readonly logger: Logger,
    @inject(SERVICES.CONFIG) private readonly config: IConfig,
    @inject(JobManagerWrapper) private readonly jobManagerClient: JobManagerWrapper,
    @inject(SERVICES.CONFIGPROVIDER) private readonly configProvider: IConfigProvider
    ) {}

  public async export(payload: Payload): Promise<IExportResponse> {

    this.logger.info({ msg: 'Creating tasks', modelId: payload.modelId });
    
    const type = payload.metadata.type ?? 'unknown';

    const createJobRequest: CreateJobBody = {
      resourceId: payload.modelId,
      version: '1',
      type: type,
      parameters: { metadata: payload.metadata },
      productType: payload.metadata.productType,
      productName: payload.metadata.productName,
      percentage: 0,
      producerName: payload.metadata.producerName,
      status: OperationStatus.IN_PROGRESS,
    };

    const res: IExportResponse = await this.jobManagerClient.create(createJobRequest);

    return res;
  }
}
