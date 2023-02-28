import * as supertest from 'supertest';

export class StatusRequestSender {
  public constructor(private readonly app: Express.Application) {}

  public async getStatus(): Promise<supertest.Response> {
    return supertest.agent(this.app).get('/status').set('Content-Type', 'application/json');
  }
}
