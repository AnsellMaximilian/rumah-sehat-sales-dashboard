import { Card, Title, Text } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';

import Search from './search';
import UsersTable from './table';
import getSalesData from './actions/getSalesData';
import WeeklyBarChart from './weeklyBarChart';

export const dynamic = 'force-dynamic',
  revalidate = 1800;

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const { values: sales, error } = await getSalesData();

  const search = searchParams.q ?? '';
  const users = await queryBuilder
    .selectFrom('users')
    .select(['id', 'name', 'username', 'email'])
    .where('name', 'like', `%${search}%`)
    .execute();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {sales && <WeeklyBarChart salesData={sales} />}
      {/* <Title>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search />
      <Card className="mt-6"> */}
      {/* @ts-expddect-error Server Component */}
      {/* <UsersTable users={users} />
      </Card> */}
    </main>
  );
}
