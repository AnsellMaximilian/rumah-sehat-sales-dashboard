import { rpFormatter } from '../../../helpers/formatter';
import getCustomersData from '../../actions/getCustomersData';
import getProductsData from '../../actions/getProductsData';
import getSalesData from '../../actions/getSalesData';
import CustomersTable from '../../customersTable';
import SalesTable from '../../salesTable';
import Search from '../../search';
import { Card, Title, Text } from '@tremor/react';

export const dynamic = 'force-dynamic',
  revalidate = 1800;

interface IParams {
  pageNumber?: string;
}

export default async function SalesPage({
  searchParams,
  params
}: {
  searchParams: { q: string };
  params: IParams;
}) {
  const swag = params.pageNumber;
  const { values: customers } = await getCustomersData();
  const { values: sales } = await getSalesData();
  const { values: products } = await getProductsData();

  const salesData = sales?.map((sale) => {
    const customer = customers.find((cus) => cus[0] === sale[2]);
    const product = products.find((prod) => prod[0] === sale[3]);
    if (customer) {
      sale[2] = customer[1];
    }
    if (product) {
      sale[3] = product[1];
    }

    const totalCost = parseFloat(sale[4]) * parseFloat(sale[6]);
    const totalSale = parseFloat(sale[5]) * parseFloat(sale[6]);

    sale[4] = rpFormatter(parseFloat(sale[4]));
    sale[5] = rpFormatter(parseFloat(sale[5]));

    sale[7] = rpFormatter(totalCost);
    sale[8] = rpFormatter(totalSale);
    sale[9] = rpFormatter(totalSale - totalCost);
    return sale;
  });

  const search = searchParams.q ?? '';

  const filteredCustomers = customers.filter((cus) =>
    cus[1].toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Customers</Title>
      <Text>Rumah Sehat Customers</Text>
      <Search />
      {salesData && (
        <Card className="mt-6">
          <SalesTable sales={salesData} />
        </Card>
      )}
    </main>
  );
}
