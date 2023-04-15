import getProductsData from '../actions/getProductsData';
import getSalesData from '../actions/getSalesData';
import getSuppliersData from '../actions/getSuppliersData';
import ProductsTable from '../productsTable';
import Search from '../search';
import WeeklyBarChart from '../weeklyBarChart';
import { Card, Title, Text } from '@tremor/react';

export const dynamic = 'force-dynamic',
  revalidate = 1800;

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const { values: products, error } = await getProductsData();
  const { values: suppliers, error: suppError } = await getSuppliersData();

  const search = searchParams.q ?? '';

  const productsData = products.map((prod) => {
    const matchingSupplier = suppliers.find((sup) => sup[0] === prod[4]);

    return [...prod, matchingSupplier ? matchingSupplier[1] : ''];
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Products</Title>
      <Text>Rumah Sehat Products</Text>
      <Search />
      {productsData && (
        <Card className="mt-6">
          <ProductsTable products={productsData} />
        </Card>
      )}
    </main>
  );
}
