'use client';

import {
  Card,
  Title,
  Subtitle,
  Metric,
  Grid,
  Col,
  Bold,
  Italic
} from '@tremor/react';
import { SaleData } from './actions/getSalesData';
import moment from 'moment';
import { rpFormatter } from '../helpers/formatter';

export default function ProfitsTotal({
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

  const profitsTotal = yearData.reduce(
    (sum, sale) =>
      sum +
      (parseFloat(sale[5]) * parseFloat(sale[6]) -
        parseFloat(sale[4]) * parseFloat(sale[6])),
    0
  );

  const weeklyTotal = weekData.reduce(
    (sum, sale) =>
      sum +
      (parseFloat(sale[5]) * parseFloat(sale[6]) -
        parseFloat(sale[4]) * parseFloat(sale[6])),
    0
  );

  return (
    <Grid className="gap-6 h-full" numCols={12}>
      <Col numColSpan={12}>
        <Card className="h-full">
          <Title>Profits</Title>
          <Subtitle>Year to Date</Subtitle>
          <Metric>{rpFormatter(profitsTotal)}</Metric>
        </Card>
      </Col>
      <Col numColSpan={12}>
        <Card className="h-full">
          <Title>Profits</Title>
          <Subtitle>This Week</Subtitle>
          <Metric>{rpFormatter(weeklyTotal)}</Metric>
        </Card>
      </Col>
    </Grid>
  );
}
