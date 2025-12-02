export interface ProcessData {
  id: string;
  type: string;
  store: string;
  city: string;
  supplier: string;
  orderNumber: string;
  orderDate: Date;
  invoiceDate: Date;
  deliveryDate: Date;
  entryDate: Date;
}

export interface Metrics {
  orderToInvoice: number;
  invoiceToDelivery: number;
  deliveryToEntry: number;
  orderToEntry: number;
}

export interface MetricComparison {
  current: number;
  previous: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface DashboardMetrics {
  orderToInvoice: MetricComparison;
  invoiceToDelivery: MetricComparison;
  deliveryToEntry: MetricComparison;
  orderToEntry: MetricComparison;
}

export interface FilterState {
  supplier: string;
  city: string;
  store: string;
}

export interface TrendPoint {
  date: string; // MM/DD or Month
  value: number;
}

export interface DistributionPoint {
  name: string;
  value: number;
}
