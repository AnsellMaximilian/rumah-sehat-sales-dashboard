'use client';

import { Card, Title, BarChart, Subtitle } from '@tremor/react';
import { SaleData } from './actions/getSalesData';
import moment from 'moment';

const dataFormatter = (number: number) => {
  return Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    currencySign: 'accounting',
    minimumFractionDigits: 0
  })
    .format(number)
    .toString();
};

export default function WeeklyBarChart({
  salesData
}: {
  salesData: Array<SaleData>;
}) {
  // const formattedSalesData = salesData.map(sale)
  const yearData = salesData.filter((date) =>
    moment(date[1]).isBetween(
      moment().startOf('year'),
      moment().endOf('year'),
      undefined,
      '[]'
    )
  );
  const chartObj = yearData.reduce(
    (obj, sale) => {
      const weekNumber = moment(sale[1]).isoWeek();

      const revenue = parseFloat(sale[5]) * parseFloat(sale[6]);

      if (obj[weekNumber]) {
        obj[weekNumber].revenue = obj[weekNumber].revenue + revenue;
      } else {
        obj[weekNumber] = { revenue };
      }

      return obj;
    },
    {} as {
      [key: string]: {
        revenue: number;
      };
    }
  );

  let chartData = [];
  for (let i = 1; i <= moment().isoWeeksInYear(); i++) {
    const weekLabel = `W ${i} '${moment().format('YY')}`;
    if (chartObj[i]) {
      chartData.push({
        name: weekLabel,
        'Total Revenue': chartObj[i].revenue,
        weekNumber: i
      });
    } else {
      chartData.push({
        name: weekLabel,
        'Total Revenue': 0,
        weekNumber: i
      });
    }
  }

  chartData = chartData.sort((week1, week2) => {
    if (week2.weekNumber > week1.weekNumber) {
      return -1;
    }
    if (week1.weekNumber > week2.weekNumber) {
      return 1;
    }
    return 0;
  });

  return (
    <Card>
      <Title>Weekly Revenue</Title>
      <Subtitle>
        2023&apos;s weekly revenue (data from 13th of February).
      </Subtitle>
      <BarChart
        className="mt-6"
        data={chartData}
        index="name"
        categories={['Total Revenue']}
        colors={['green']}
        valueFormatter={dataFormatter}
        yAxisWidth={80}
      />
    </Card>
  );
}
