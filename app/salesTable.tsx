'use-client';

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

export default function SalesTable({ sales }: { sales: string[][] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Customer</TableHeaderCell>
          <TableHeaderCell>Product</TableHeaderCell>
          <TableHeaderCell>Cost</TableHeaderCell>
          <TableHeaderCell>Price</TableHeaderCell>
          <TableHeaderCell>Qty</TableHeaderCell>
          <TableHeaderCell>Total Cost</TableHeaderCell>
          <TableHeaderCell>Total Sale</TableHeaderCell>
          <TableHeaderCell>Profit</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sales.map((sales) => (
          <TableRow key={sales[0]}>
            <TableCell>{sales[0]}</TableCell>

            <TableCell>{sales[1]}</TableCell>
            <TableCell>
              <Text>{sales[2]}</Text>
            </TableCell>
            <TableCell>
              <Text>{sales[3]}</Text>
            </TableCell>
            <TableCell>
              <Text>{sales[4]}</Text>
            </TableCell>
            <TableCell>
              <Text>{sales[5]}</Text>
            </TableCell>
            <TableCell>
              <Text>{sales[6]}</Text>
            </TableCell>
            <TableCell>
              <Text>{sales[7]}</Text>
            </TableCell>
            <TableCell>
              <Text>{sales[8]}</Text>
            </TableCell>
            <TableCell>
              <Text>{sales[9]}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
