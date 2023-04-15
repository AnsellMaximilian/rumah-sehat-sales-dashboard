export const rpFormatter = (number: number) => {
  return Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    currencySign: 'accounting',
    minimumFractionDigits: 0
  })
    .format(number)
    .toString();
};
