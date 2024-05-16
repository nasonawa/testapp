import React, { useEffect, useState } from 'react';

import {useApi,configApiRef} from '@backstage/core-plugin-api'
import DigestClient from 'digest-fetch';
import {LogViewer} from '@backstage/core-components';
import axios from 'axios';

export const ServerlogsComponent = () => {

  const  [logdata,setData] = useState('');
  const config = useApi(configApiRef);

  const username = 'user';
  const password = 'pass';
  
  const BASE_URL = 'http://localhost:9990/management/subsystem/logging/log-file/server.log?operation=attribute&name=stream&useStreamAsResponse';

  const client = new DigestClient('user', 'pass') 
  const fetchdata =   () => {

    client.fetch(`${BASE_URL}/subsystem/logging/log-file/server.log?operation=attribute&name=stream&useStreamAsResponse`, {})
    .then(resp=>resp.text())
    .then(data=>setData(data))
    .catch(e=>console.error(e))

  };

  useEffect(()=> {
    fetchdata();

  },[username,password,BASE_URL]);

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