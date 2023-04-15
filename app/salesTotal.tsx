'use client';

import {
  Card,
  Title,
  Subtitle,
  Metric,
  Text,
  Bold,
  Italic
} from '@tremor/react';
import { SaleData } from './actions/getSalesData';
import moment from 'moment';
import { rpFormatter } from '../helpers/formatter';

export default function SalesTotal({
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

  const weekData = yearData.filter((date) =>
    moment(date[1]).isBetween(
      moment().startOf('isoWeek'),
      moment().endOf('isoWeek'),
      undefined,
      '[]'
    )
  );

  const salesTotal = yearData.reduce(
    (sum, sale) => sum + parseFloat(sale[5]) * parseFloat(sale[6]),
    0
  );

  const weeklyTotal = weekData.reduce(
    (sum, sale) => sum + parseFloat(sale[5]) * parseFloat(sale[6]),
    0
  );

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <Card>
          <Title>Revenue</Title>
          <Subtitle>Year to Date</Subtitle>
          <Bold style={{ fontSize: 24 }}>{rpFormatter(salesTotal)}</Bold>
        </Card>
      </div>
      <div className="col-span-12">
        <Card>
          <Title>Revenue</Title>
          <Subtitle>This Week</Subtitle>
          <Bold style={{ fontSize: 24 }}>{rpFormatter(weeklyTotal)}</Bold>
        </Card>
      </div>
    </div>
  );
}
