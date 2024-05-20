import React, { useEffect, useState } from 'react';

import {useApi,configApiRef} from '@backstage/core-plugin-api'
import DigestClient from 'digest-fetch';
import {LogViewer} from '@backstage/core-components';

export const ServerlogsComponent = () => {

  const  [logdata,setData] = useState('');
  const config = useApi(configApiRef);

  const username = config.get('wildfly.username');
  const password = config.get('wildfly.password');
  
  const BASE_URL = config.get('wildfly.url');
  
  const client = new DigestClient(username, password);

  useEffect(()=> {
    const fetchdata =  async () => {
      try {
        const response = await client.fetch(`${BASE_URL}/subsystem/logging/log-file/server.log?operation=attribute&name=stream&useStreamAsResponse`, {})
        const data = await response.text();
        setData(data);
      }catch(e) {
        console.log(e);
      }
    };
    fetchdata();

  },[]);

  return (
  <div style={{ height: 240 }}>
    <LogViewer text={logdata} />
  </div>
  );
};



  /*
  Client.fetch(`${BASE_URL}/subsystem/logging/log-file/server.log?operation=attribute&name=stream&useStreamAsResponse`, {})
  .then(resp=>resp.text())
  .then(data=>console.log(data))
  .catch(e=>console.error(e))

  */