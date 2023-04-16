import { Card, Title, Text, Grid, Col, Metric } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';

import Search from './search';
import UsersTable from './table';
import getSalesData from './actions/getSalesData';
import WeeklyBarChart from './weeklyBarChart';
import SalesTotal from './salesTotal';
import PerformanceChart from './profitsAreaChart';
import ProfitsTotal from './profitsTotal';
import getMetadata from './actions/getMetadata';
import moment from 'moment';
import LastUpdatedCard from './lastUpdatedCard';

export const dynamic = 'force-dynamic',
  revalidate = 1800;

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const { values: sales, error } = await getSalesData();
  const { values: metadata, error: metadataError } = await getMetadata();

  const search = searchParams.q ?? '';
  // const users = await queryBuilder
  //   .selectFrom('users')
  //   .select(['id', 'name', 'username', 'email'])
  //   .where('name', 'like', `%${search}%`)
  //   .execute();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid className="gap-6" numColsSm={12}>
        <Col numColSpan={12} numColSpanMd={12}>
          {metadata && <LastUpdatedCard metadata={metadata} />}
        </Col>
        <Col numColSpan={12} numColSpanMd={8}>
          {sales && <WeeklyBarChart salesData={sales} />}
        </Col>
        <Col numColSpan={12} numColSpanMd={4}>
          {sales && <SalesTotal salesData={sales} />}
        </Col>

        <Col numColSpan={12} numColSpanMd={4}>
          {sales && <ProfitsTotal salesData={sales} />}
        </Col>
        <Col numColSpan={12} numColSpanMd={8}>
          {sales && <PerformanceChart salesData={sales} />}
        </Col>
      </Grid>
    </main>
  );
}
