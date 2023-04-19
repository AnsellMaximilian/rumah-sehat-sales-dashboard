import getCustomersData from '../actions/getCustomersData';
import CustomersTable from '../customersTable';
import Search from '../search';
import { Card, Title, Text } from '@tremor/react';

export const dynamic = 'force-dynamic',
  revalidate = 1800;

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const { values: customers, error } = await getCustomersData();

  const search = searchParams.q ?? '';

  const filteredCustomers = customers.filter((cus) =>
    cus[1].toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Customers</Title>
      <Text>Rumah Sehat Customers</Text>
      <Search />
      {customers && (
        <Card className="mt-6">
          <CustomersTable customers={filteredCustomers} />
        </Card>
      )}
    </main>
  );
}
