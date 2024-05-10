import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const wildflyMonitorPlugin = createPlugin({
  id: 'wildfly-monitor',
  routes: {
    root: rootRouteRef,
  },
});

export const WildflyMonitorPage = wildflyMonitorPlugin.provide(
  createRoutableExtension({
    name: 'WildflyMonitorPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
