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

export default function CustomersTable({
  customers
}: {
  customers: string[][];
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Phone</TableHeaderCell>
          <TableHeaderCell>Address</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer[0]}>
            <TableCell>{customer[0]}</TableCell>

            <TableCell>{customer[1]}</TableCell>
            <TableCell>
              <Text>{customer[2]}</Text>
            </TableCell>
            <TableCell>
              <Text>{customer[3]}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
