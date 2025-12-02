import { ProcessData } from '../types';

const SUPPLIERS = ['Fornecedor A', 'Fornecedor B', 'Fornecedor C', 'TechDist', 'LogiGlobal'];
const CITIES = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre'];
const STORES = ['Loja Centro', 'Loja Shopping', 'Loja Norte', 'Loja Sul', 'Loja Expresso'];

// Helper to add days to a date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Helper to get random int
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateMockData = (count: number = 300): ProcessData[] => {
  const data: ProcessData[] = [];
  const today = new Date();
  
  // Generate data spanning back 60 days to allow for "Previous Month" comparison
  for (let i = 0; i < count; i++) {
    const daysAgo = randomInt(0, 60);
    const orderDate = new Date(today);
    orderDate.setDate(today.getDate() - daysAgo);

    // Simulate process times with some variance
    const daysToInvoice = randomInt(1, 5);
    const invoiceDate = addDays(orderDate, daysToInvoice);

    const daysToDelivery = randomInt(2, 10);
    const deliveryDate = addDays(invoiceDate, daysToDelivery);

    const daysToEntry = randomInt(0, 3);
    const entryDate = addDays(deliveryDate, daysToEntry);

    data.push({
      id: `ORD-${1000 + i}`,
      type: 'Standard',
      store: STORES[randomInt(0, STORES.length - 1)],
      city: CITIES[randomInt(0, CITIES.length - 1)],
      supplier: SUPPLIERS[randomInt(0, SUPPLIERS.length - 1)],
      orderNumber: `${2024000 + i}`,
      orderDate,
      invoiceDate,
      deliveryDate,
      entryDate,
    });
  }
  
  return data.sort((a, b) => a.orderDate.getTime() - b.orderDate.getTime());
};
