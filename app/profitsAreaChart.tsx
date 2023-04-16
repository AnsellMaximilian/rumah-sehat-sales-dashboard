'use client';

import {
  Card,
  Title,
  BarChart,
  Subtitle,
  AreaChart,
  Text
} from '@tremor/react';
import { SaleData } from './actions/getSalesData';
import moment from 'moment';
import { rpFormatter } from '../helpers/formatter';

const valueFormatter = rpFormatter;

export default function PerformanceChart({
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
      const totalCost = parseFloat(sale[4]) * parseFloat(sale[6]);
      const profit = revenue - totalCost;

      if (obj[weekNumber]) {
        obj[weekNumber].revenue = obj[weekNumber].revenue + revenue;
        obj[weekNumber].profit = obj[weekNumber].profit + profit;
      } else {
        obj[weekNumber] = { revenue, profit };
      }

      return obj;
    },
    {} as {
      [key: string]: {
        revenue: number;
        profit: number;
      };
    }
  );

  let chartData = [];
  for (let i = 1; i <= moment().isoWeeksInYear(); i++) {
    const weekLabel = `W ${i} '${moment().format('YY')}`;
    if (chartObj[i]) {
      chartData.push({
        week: weekLabel,
        Sales: chartObj[i].revenue,
        Profit: chartObj[i].profit,
        weekNumber: i
      });
    } else {
      chartData.push({
        week: weekLabel,
        Sales: 0,
        Profit: 0,
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

  console.log(chartData);

  return (
    <Card>
      <Title>Performance</Title>
      <Text>Comparison between Sales and Profit</Text>
      <AreaChart
        className="mt-6"
        data={chartData}
        categories={['Sales', 'Profit']}
        index="week"
        colors={['indigo', 'fuchsia']}
        valueFormatter={valueFormatter}
        yAxisWidth={80}
      />
    </Card>
  );
}
