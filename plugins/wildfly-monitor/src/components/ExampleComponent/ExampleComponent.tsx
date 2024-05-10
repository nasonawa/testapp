import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { ExampleFetchComponent } from '../ExampleFetchComponent';
import { DeploymentComponents } from '../DeplymentsComponent/DeploymentsComponent';
import { MemoryComponent } from '../MemoryComponent/MemoryComponent';
import { ServerlogsComponent } from '../ServerlogsComponent/ServerlogsComponent';

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to wildfly-monitor!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Wildfly Monitoring">
        <SupportButton>A plugin to monitor the wildfly instances.</SupportButton>
      </ContentHeader>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <MemoryComponent/>
        </Grid>
        <Grid item xs={6}>
          <DeploymentComponents></DeploymentComponents>
        </Grid>
        <Grid item xs={12}>
          <ServerlogsComponent></ServerlogsComponent>
        </Grid>
      </Grid>
    </Content>
  </Page>
);
