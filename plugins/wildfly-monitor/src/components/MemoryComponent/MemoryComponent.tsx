import React, { useEffect, useState } from 'react';
import DigestClient from 'digest-fetch';

import {useApi,configApiRef} from '@backstage/core-plugin-api'

import { Grid } from '@material-ui/core';
import {GaugeCard} from '@backstage/core-components'

interface heap {
  used: number,
  committed: number,
  max: number
 }

 interface threads {
  'thread-count': number,   
  'daemon-thread-count': number
 }

export const MemoryComponent = () => {
  const config = useApi(configApiRef);

  const username = config.get('wildfly.username');
  const password = config.get('wildfly.password');
  
  const BASE_URL = config.get('wildfly.url');
  
  const client = new DigestClient(username, password);
 

 const [heaps,setHeap] = useState<heap>();
 const [nonheaps,setNonHeap] = useState<heap>();
 const [threads,setthread] = useState<threads>();

  useEffect(()=> {

      const fetchMemory = async () =>{
        try {
          const response = await client.fetch(`${BASE_URL}/core-service/platform-mbean/type/memory?operation=attribute&name=heap-memory-usage&json.pretty=1`, {})
          const data = await response.json();
          return data;
        }catch(e) {
          console.log(e);
        }
      };
      const fetchNonMemory = async () =>{
        try {
          const response = await client.fetch(`${BASE_URL}/core-service/platform-mbean/type/memory?operation=attribute&name=non-heap-memory-usage&json.pretty=1`, {})
          const data = await response.json();
          return data;
        }catch(e) {
          console.log(e);
        }
      };

      const fetchThreads = async () =>{
        try {
          const response = await client.fetch(`${BASE_URL}/core-service/platform-mbean/type/threading?operation=resource&json.pretty=1`, {})
          const data = await response.json();
         
          return data;
        }catch(e) {
          console.log(e);
        }
      };

      const fetchData = async () => {
        try {
        const [heapdata,nonheapdata,threaddata] = await Promise.all([fetchMemory(),fetchNonMemory(),fetchThreads()]);
        setHeap(heapdata);
        setNonHeap(nonheapdata);
        setthread(threaddata);
        }catch(e) {
          console.log(e);
        }
      }
      
      fetchData();
  },[]);


 return (<Grid container spacing={2}>
        <Grid item xs={6}>
          <GaugeCard title="Heap-Used" inverse progress={heaps?.used/heaps?.max} />
       </Grid>
      <Grid item xs={6}>
        <GaugeCard title="Heap-Committed" inverse progress={heaps?.committed/heaps?.max} />
      </Grid>
      <Grid item xs={6}>
          <GaugeCard title="Non-Heap-Used" inverse progress={nonheaps?.used/nonheaps?.max} />
       </Grid>
      <Grid item xs={6}>
        <GaugeCard title="Threads-Daemon" inverse progress={threads?.['daemon-thread-count']/threads?.['thread-count']} />
      </Grid>
    </Grid>)
};

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