import React from 'react';

import {useApi,configApiRef} from '@backstage/core-plugin-api'

import {Box,Chip,Typography} from '@material-ui/core';
import {Table,TableColumn,StatusOK,Link} from '@backstage/core-components';

export const DeploymentComponents = () => (
    <Table
            options={{ paging: true, padding: 'dense' }}
            data={generateTestData(2)}
            columns={columns}
            title="Deployments"
    />
)

interface TableData {
    id: number;
    branch: string;
    hash: string;
    status: string;
  }
  
  const generateTestData = (rows = 2) => {
    const data: Array<TableData> = [];
    while (data.length <= rows) {
      data.push({
        id: data.length + 18534,
        branch: 'techdocs: modify documentation header',
        hash: 'techdocs/docs-header 5749c98e3f61f8bb116e5cb87b0e4e1 ',
        status: 'Success',
      });
    }
    return data;
  };
  
  const columns: TableColumn[] = [
    {
      title: 'ID',
      field: 'id',
      highlight: true,
      type: 'numeric',
      width: '80px',
    },
    {
      title: 'Message/Source',
      highlight: true,
      render: (row: Partial<TableData>) => (
        <>
          <Link to="#message-source">{row.branch}</Link>
          <Typography variant="body2">{row.hash}</Typography>
        </>
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
    {
      title: 'Tags',
      render: () => <Chip label="Tag Name" />,
      width: '10%',
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