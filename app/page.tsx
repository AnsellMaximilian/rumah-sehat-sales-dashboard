import { Card, Title, Text, Grid, Col } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';

import Search from './search';
import UsersTable from './table';
import getSalesData from './actions/getSalesData';
import WeeklyBarChart from './weeklyBarChart';
import SalesTotal from './salesTotal';

export const dynamic = 'force-dynamic',
  revalidate = 1800;

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const { values: sales, error } = await getSalesData();

  const search = searchParams.q ?? '';
  // const users = await queryBuilder
  //   .selectFrom('users')
  //   .select(['id', 'name', 'username', 'email'])
  //   .where('name', 'like', `%${search}%`)
  //   .execute();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid className="gap-6" numColsSm={12}>
        <Col numColSpan={12} numColSpanMd={8}>
          {sales && <WeeklyBarChart salesData={sales} />}
        </Col>
        <Col numColSpan={12} numColSpanMd={4}>
          {sales && <SalesTotal salesData={sales} />}
        </Col>
      </Grid>
    </main>
  );
}
