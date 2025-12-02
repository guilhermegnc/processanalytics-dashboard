import { ProcessData, DashboardMetrics, TrendPoint, DistributionPoint } from '../types';

const getDiffDays = (start: Date, end: Date): number => {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return diffTime / (1000 * 60 * 60 * 24);
};

const calculateAverage = (data: ProcessData[], metricFn: (d: ProcessData) => number): number => {
  if (data.length === 0) return 0;
  const total = data.reduce((acc, curr) => acc + metricFn(curr), 0);
  return parseFloat((total / data.length).toFixed(1));
};

export const getAvailableFilters = (data: ProcessData[]) => {
  const suppliers = Array.from(new Set(data.map(d => d.supplier))).sort();
  const cities = Array.from(new Set(data.map(d => d.city))).sort();
  const stores = Array.from(new Set(data.map(d => d.store))).sort();
  return { suppliers, cities, stores };
};

export const calculateDashboardMetrics = (filteredData: ProcessData[]): DashboardMetrics => {
  const today = new Date();
  // Simplified logic: Current month vs Previous 30 days window
  // In a real app, we'd strict month boundaries, but sliding window is fine for this demo.
  
  const currentWindowStart = new Date(today);
  currentWindowStart.setDate(today.getDate() - 30);
  
  const previousWindowStart = new Date(currentWindowStart);
  previousWindowStart.setDate(currentWindowStart.getDate() - 30);

  const currentData = filteredData.filter(d => d.orderDate >= currentWindowStart);
  const previousData = filteredData.filter(d => d.orderDate >= previousWindowStart && d.orderDate < currentWindowStart);

  const calcMetric = (fn: (d: ProcessData) => number) => {
    const current = calculateAverage(currentData, fn);
    const previous = calculateAverage(previousData, fn);
    const change = previous === 0 ? 0 : ((current - previous) / previous) * 100;
    
    return {
      current,
      previous,
      changePercent: Math.abs(parseFloat(change.toFixed(1))),
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
    } as const;
  };

  return {
    orderToInvoice: calcMetric(d => getDiffDays(d.orderDate, d.invoiceDate)),
    invoiceToDelivery: calcMetric(d => getDiffDays(d.invoiceDate, d.deliveryDate)),
    deliveryToEntry: calcMetric(d => getDiffDays(d.deliveryDate, d.entryDate)),
    orderToEntry: calcMetric(d => getDiffDays(d.orderDate, d.entryDate)),
  };
};

export const getTrendData = (data: ProcessData[], metricFn: (d: ProcessData) => number): TrendPoint[] => {
    // Group by day for the last 30 days
    const result: Record<string, { sum: number; count: number }> = {};
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 30);

    data.forEach(d => {
        if (d.orderDate >= startDate) {
            const dateKey = d.orderDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
            if (!result[dateKey]) result[dateKey] = { sum: 0, count: 0 };
            result[dateKey].sum += metricFn(d);
            result[dateKey].count += 1;
        }
    });

    return Object.entries(result).map(([date, val]) => ({
        date,
        value: parseFloat((val.sum / val.count).toFixed(1))
    })).sort((a,b) => {
        // simple sort assumption for DD/MM
        const [d1, m1] = a.date.split('/').map(Number);
        const [d2, m2] = b.date.split('/').map(Number);
        return (m1 * 31 + d1) - (m2 * 31 + d2);
    });
};

export const getDistributionData = (data: ProcessData[], key: keyof ProcessData, metricFn: (d: ProcessData) => number): DistributionPoint[] => {
    const result: Record<string, { sum: number; count: number }> = {};
    
    data.forEach(d => {
        const groupKey = String(d[key]);
        if (!result[groupKey]) result[groupKey] = { sum: 0, count: 0 };
        result[groupKey].sum += metricFn(d);
        result[groupKey].count += 1;
    });

    return Object.entries(result)
        .map(([name, val]) => ({
            name,
            value: parseFloat((val.sum / val.count).toFixed(1))
        }))
        .sort((a, b) => b.value - a.value) // Sort descending by duration
        .slice(0, 5); // Top 5
};

export const metricFunctions = {
    orderToInvoice: (d: ProcessData) => getDiffDays(d.orderDate, d.invoiceDate),
    invoiceToDelivery: (d: ProcessData) => getDiffDays(d.invoiceDate, d.deliveryDate),
    deliveryToEntry: (d: ProcessData) => getDiffDays(d.deliveryDate, d.entryDate),
    orderToEntry: (d: ProcessData) => getDiffDays(d.orderDate, d.entryDate),
};
