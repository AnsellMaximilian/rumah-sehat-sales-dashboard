'use client';

import { Card, Title, BarChart, Subtitle, Metric } from '@tremor/react';
import { SaleData } from './actions/getSalesData';
import moment from 'moment';
import { rpFormatter } from '../helpers/formatter';
import { Metadata } from './actions/getMetadata';

const dataFormatter = rpFormatter;

export default function LastUpdatedCard({
  metadata
}: {
  metadata: Array<Metadata>;
}) {
  return (
    <Card>
      <Title>Last Updated</Title>
      <Metric>
        {moment(metadata[0], 'YYYY-MM-DD hh:mm:ss').format(
          'DD MMMM YYYY, hh:mm:ss'
        )}
      </Metric>
    </Card>
  );
}
