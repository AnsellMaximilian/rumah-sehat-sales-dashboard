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

export default function ProductsTable({ products }: { products: string[][] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Supplier</TableHeaderCell>
          <TableHeaderCell>Cost</TableHeaderCell>
          <TableHeaderCell>Price</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product[0]}>
            <TableCell>{product[0]}</TableCell>

            <TableCell>{product[1]}</TableCell>
            <TableCell>
              <Text>{product[5]}</Text>
            </TableCell>
            <TableCell>
              <Text>{product[2]}</Text>
            </TableCell>
            <TableCell>
              <Text>{product[3]}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
