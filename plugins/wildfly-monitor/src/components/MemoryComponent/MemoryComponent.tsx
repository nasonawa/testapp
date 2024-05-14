import React from 'react';
import Digestclient from 'digest-fetch';

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

/*
const username = 'user';
const passwd = 'pass';

const BASE_URL = 'http://localhost:9990/management';;

const Client = new DigestClient(username,passwd);

// Heap-Used,Heap-Committed
Client.fetch(`${BASE_URL}/core-service/platform-mbean/type/memory?operation=attribute&name=heap-memory-usage&json.pretty=1`, {})
  .then(resp=>resp.json())
  .then(data=>console.log(data))
  .catch(e=>console.error(e))


//Non-Heap-Used
 Client.fetch(`${BASE_URL}/core-service/platform-mbean/type/memory?operation=attribute&name=non-heap-memory-usage&json.pretty=1`, {})
  .then(resp=>resp.json())
  .then(data=>console.log(data))
  .catch(e=>console.error(e))

//daemon threads
  Client.fetch(`${BASE_URL}/core-service/platform-mbean/type/threading?operation=resource&json.pretty=1`, {})
  .then(resp=>resp.json())
  .then(data=>console.log(data))
  .catch(e=>console.error(e))

*/