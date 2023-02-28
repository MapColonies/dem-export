import jsLogger from '@map-colonies/js-logger';
import { StatusManager } from '../../../../src/status/models/statusManager';

let statusManager: StatusManager;

describe('ExportManager', () => {
  beforeEach(function () {
    statusManager = new StatusManager(jsLogger({ enabled: false }));
  });
  describe('#getResource', () => {
    it('should return resource of kind avi', function () {
      // action
      const resource = statusManager.getResource();

      // expectation
      expect(resource.kind).toBe('avi');
      expect(resource.isAlive).toBe(false);
    });
  });
});
