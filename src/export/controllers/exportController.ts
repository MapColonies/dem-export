import { RequestHandler } from 'express';
import httpStatus from 'http-status-codes';
import { injectable, inject } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { SERVICES } from '../../common/constants';
import { IExportResponse, Payload } from '../../common/interfaces';
import { ExportManager } from '../models/exportManager';

type ExportHandler = RequestHandler<undefined, IExportResponse, Payload>;

@injectable()
export class ExportController {

  public constructor(
    @inject(SERVICES.LOGGER) private readonly logger: Logger,
    @inject(ExportManager) private readonly manager: ExportManager,
  ) {}

  public export: ExportHandler = async (req, res, next) => {
    const input: Payload = req.body;
    try {
      const jobCreated = await this.manager.export(input);
      this.logger.debug(`User input: ${JSON.stringify(input)}`);
      return res.status(httpStatus.CREATED).json(jobCreated);
    } catch (err) {
      next(err);
    }
  };
}
