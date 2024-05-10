import React from 'react';

import {useApi,configApiRef} from '@backstage/core-plugin-api'

import { Grid } from '@material-ui/core';
import {GaugeCard,} from '@backstage/core-components'


export const MemoryComponent = () => {
 return<Grid container spacing={2}>
        <Grid item xs={6}>
          <GaugeCard title="Heap-Used" inverse progress={0.3} />
       </Grid>
      <Grid item xs={6}>
        <GaugeCard title="Heap-Committed" inverse progress={0.57} />
      </Grid>
      <Grid item xs={6}>
          <GaugeCard title="Non-Heap-Used" inverse progress={0.3} />
       </Grid>
      <Grid item xs={6}>
        <GaugeCard title="Threads-Daemon" inverse progress={0.57} />
      </Grid>
    </Grid>
}