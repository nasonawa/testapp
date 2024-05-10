import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { wildflyMonitorPlugin, WildflyMonitorPage } from '../src/plugin';

createDevApp()
  .registerPlugin(wildflyMonitorPlugin)
  .addPage({
    element: <WildflyMonitorPage />,
    title: 'Root Page',
    path: '/wildfly-monitor',
  })
  .render();
