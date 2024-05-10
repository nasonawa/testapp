import { wildflyMonitorPlugin } from './plugin';

describe('wildfly-monitor', () => {
  it('should export plugin', () => {
    expect(wildflyMonitorPlugin).toBeDefined();
  });
});
