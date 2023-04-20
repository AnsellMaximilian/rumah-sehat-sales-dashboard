import { rpFormatter } from '../../../helpers/formatter';
import getCustomersData from '../../actions/getCustomersData';
import getProductsData from '../../actions/getProductsData';
import getSalesData from '../../actions/getSalesData';
import CustomersTable from '../../customersTable';
import SalesTable from '../../salesTable';
import Search from '../../search';
import { Card, Title, Text } from '@tremor/react';
import Select from '../../select';
import DateSelect from '../../dateSelect';
import moment from 'moment';

export const dynamic = 'force-dynamic',
  revalidate = 1800;

interface IParams {
  pageNumber?: string;
}

export default async function SalesPage({
  searchParams,
  params
}: {
  searchParams: {
    customerId: string;
    productId: string;
    startDate: string;
    endDate: string;
  };
  params: IParams;
}) {
  const pageNumber = params.pageNumber ? params.pageNumber : '1';

  const { values: customers } = await getCustomersData();
  const { values: sales } = await getSalesData();
  const { values: products } = await getProductsData();

  const searchCustomerId = searchParams.customerId ?? 'all';
  const searchProductId = searchParams.productId ?? 'all';
  const searchStartDate = searchParams.startDate ?? '';
  const searchEndDate = searchParams.endDate ?? '';

  let salesData = sales;

  if (searchCustomerId !== 'all') {
    salesData = salesData.filter((sale) => sale[2] === searchCustomerId);
  }

  if (searchProductId !== 'all') {
    salesData = salesData.filter((sale) => sale[3] === searchProductId);
  }

  if (searchStartDate) {
    salesData = salesData.filter((sale) =>
      moment(sale[1]).isSameOrAfter(moment(searchStartDate))
    );
  }
  if (searchEndDate) {
    salesData = salesData.filter((sale) =>
      moment(sale[1]).isSameOrBefore(moment(searchEndDate))
    );
  }

  salesData = salesData.map((sale) => {
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

  const pagination = [];

  for (let i = 1; i <= Math.ceil(salesData.length / 50); i++) {
    pagination.push(
      <li key={i} className="">
        <a
          href={`/sales/${i}?${new URLSearchParams(searchParams).toString()}`}
          className={`text-sm hover:underline hover:text-blue-500 ${
            parseInt(pageNumber) === i ? 'text-blue-500' : ''
          }`}
        >
          {i}
        </a>
      </li>
    );
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Sales</Title>
      <Text>Rumah Sehat Product Sales</Text>
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 md:col-span-6">
          <Select
            options={customers.map((cus) => ({ value: cus[0], label: cus[1] }))}
            paramName="customerId"
            label="Filter by Customer"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Select
            options={products.map((prod) => ({
              value: prod[0],
              label: prod[1]
            }))}
            paramName="productId"
            label="Filter by Product"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <DateSelect paramName="startDate" label="Filter By Start Date" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <DateSelect paramName="endDate" label="Filter By End Date" />
        </div>
        <div className="col-span-6">
          <button
            className="w-full text-green-500 font-bold py-2 px-4 rounded focus:ring-offset-2 focus:ring-2 focus:ring-green-300 border-green-500 border bg-white hover:bg-gray-50"
            type="button"
          >
            RESET FILTER
          </button>
        </div>
        <div className="col-span-6">
          <button
            className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:ring-offset-2 focus:ring-2 focus:ring-green-300"
            type="button"
          >
            THIS WEEK
          </button>
        </div>
      </div>
      {salesData && (
        <>
          <Card className="mt-6">
            <SalesTable
              sales={salesData.slice(
                (parseInt(pageNumber) - 1) * 50,
                50 * parseInt(pageNumber)
              )}
            />
          </Card>
          <Card className="mt-4">
            Current Page: {pageNumber} / {Math.ceil(salesData.length / 50)}
            <ul className="flex gap-2 overflow-x-auto py-2">{pagination}</ul>
          </Card>
        </>
      )}
    </main>
  );
}
