import React, { useEffect, useState } from 'react';

import DigestClient from 'digest-fetch';
import {useApi,configApiRef} from '@backstage/core-plugin-api'

import {Box,Typography} from '@material-ui/core';
import {Table,TableColumn,StatusOK} from '@backstage/core-components';


interface TableData {
  name:string;
  'runtime-name': string;
  status: string;
}

export const DeploymentComponents = () => {
   
  
  const config = useApi(configApiRef);

  const username = config.get('wildfly.username');
  const password = config.get('wildfly.password');  
  const BASE_URL = config.get('wildfly.url');
  
  const client = new DigestClient(username, password);
  
  const [tableData,setTabledata] = useState<TableData[]>([]);
    
  useEffect(()=> {

      const fetchDeployments = async () => {
        try {
          let resp = await client.fetch(`${BASE_URL}/deployment`, {})
          let jsonbody = await resp.json();
          let promises: any[] = [];

          Object.keys(jsonbody.deployment).forEach((k)=>{
            promises.push(client.fetch(`${BASE_URL}/deployment/${k}?operation=resource&include-runtime=true&json.pretty=1`, {}))
          });

          let responses = await Promise.all(promises);
          let datarr = await Promise.all(responses.map(res => res.json()));
          setTabledata(datarr);
          
        }catch(error){
          console.log(error);
        }
      };

      fetchDeployments();
    },[]);


  return (<Table
            options={{ paging: true, padding: 'dense' }}
            data={tableData}
            columns={columns}
            title="Deployments"
    />)
  }
  
  const columns: TableColumn[] = [
    {
      title: 'Name',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <>
          <Typography variant="body2">{row.name}</Typography>
        </>
      ),
    },
    {
      title: 'runtime-name',
      render: (row: Partial<TableData>) => (
        <Box display="flex" alignItems="center">
          <Typography variant="body2">{row['runtime-name']}</Typography>
        </Box>
      ),
    },
    {
      title: 'Status',
      render: (row: Partial<TableData>) => (
        <Box display="flex" alignItems="center">
          <StatusOK />
          <Typography variant="body2">{row.status}</Typography>
        </Box>
      ),
    },
    
  ];
  
  /*
  Client.fetch(`${BASE_URL}/deployment/clac.war?operation=resource&include-runtime=true&json.pretty=1`, {})
  .then(resp=>resp.json())
  .then(data=>console.log(data))
  .catch(e=>console.error(e))

  Client.fetch(`${BASE_URL}/deployment`, {})
  .then(resp=>resp.json())
  .then(data=>console.log(data))
  .catch(e=>console.error(e))
 */