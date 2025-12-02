import React, { useEffect, useMemo, useState } from 'react';
import { FilterBar } from './components/FilterBar';
import { KPICard } from './components/KPICard';
import { TrendChart, DistributionBar } from './components/Charts';
import { generateMockData } from './utils/mockData';
import {
  calculateDashboardMetrics,
  getAvailableFilters,
  getTrendData,
  metricFunctions,
  getDistributionData,
} from './utils/analytics';
import { FilterState, ProcessData } from './types';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ProcessData[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    supplier: '',
    city: '',
    store: '',
  });

  // Initialize data
  useEffect(() => {
    const mock = generateMockData(500);
    setData(mock);
  }, []);

  const options = useMemo(() => getAvailableFilters(data), [data]);

  const filteredData = useMemo(() => {
    return data.filter((d) => {
      if (filters.supplier && d.supplier !== filters.supplier) return false;
      if (filters.city && d.city !== filters.city) return false;
      if (filters.store && d.store !== filters.store) return false;
      return true;
    });
  }, [data, filters]);

  const metrics = useMemo(() => calculateDashboardMetrics(filteredData), [filteredData]);

  const trendOrderToInvoice = useMemo(() => getTrendData(filteredData, metricFunctions.orderToInvoice), [filteredData]);
  const trendInvoiceToDelivery = useMemo(() => getTrendData(filteredData, metricFunctions.invoiceToDelivery), [filteredData]);
  const trendDeliveryToEntry = useMemo(() => getTrendData(filteredData, metricFunctions.deliveryToEntry), [filteredData]);

  const distSupplier = useMemo(() => getDistributionData(filteredData, 'supplier', metricFunctions.orderToEntry), [filteredData]);
  const distCity = useMemo(() => getDistributionData(filteredData, 'city', metricFunctions.orderToEntry), [filteredData]);
  const distStore = useMemo(() => getDistributionData(filteredData, 'store', metricFunctions.orderToEntry), [filteredData]);

  const maxBarValue = Math.max(
    ...distSupplier.map(d => d.value),
    ...distCity.map(d => d.value),
    ...distStore.map(d => d.value),
    10
  );

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background font-sans text-gray-100">
      
      {/* Ambient Background Effects */}
      <div className="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] h-[50%] w-[50%] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-7xl p-6 lg:p-10">
          
          <header className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
                    <Sparkles className="h-4 w-4 text-white" />
                 </div>
                 <span className="text-sm font-bold tracking-widest text-indigo-400 uppercase">Analytics Pro</span>
              </div>
              <h2 className="text-gradient text-3xl font-bold tracking-tight sm:text-4xl">
                Dashboard de Processos
              </h2>
            </div>
            {/*<p className="text-sm text-gray-500">Última atualização: Hoje, 14:30</p>*/}
          </header>

          <FilterBar
            filters={filters}
            options={options}
            onFilterChange={handleFilterChange}
          />

          {/* KPI Grid */}
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <KPICard 
                title="Pedido à Emissão" 
                metric={metrics.orderToInvoice} 
                iconType="clock"
            />
            <KPICard 
                title="Emissão à Entrega" 
                metric={metrics.invoiceToDelivery} 
                iconType="activity"
                inverse={false}
            />
            <KPICard 
                title="Entrega à Entrada" 
                metric={metrics.deliveryToEntry} 
                iconType="check"
            />
            <KPICard 
                title="Ciclo Completo" 
                metric={metrics.orderToEntry} 
                iconType="trend"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            
            {/* Left Column: Trends */}
            <div className="glass-panel flex flex-col gap-8 rounded-2xl p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-200">
                  Evolução Temporal
                </h3>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400 border border-white/5">Últimos 30 dias</span>
              </div>
              
              <div className="flex flex-col gap-10">
                <div className="group">
                  <div className="mb-4 flex items-end justify-between">
                    <p className="text-sm font-medium text-gray-400 group-hover:text-indigo-400 transition-colors">Pedido à Emissão</p>
                    <span className="text-xl font-bold text-white">{metrics.orderToInvoice.current}d</span>
                  </div>
                  <TrendChart data={trendOrderToInvoice} color="indigo" gradientColors={['#6366f1', '#818cf8']} />
                </div>

                <div className="group">
                  <div className="mb-4 flex items-end justify-between">
                    <p className="text-sm font-medium text-gray-400 group-hover:text-violet-400 transition-colors">Emissão à Entrega</p>
                    <span className="text-xl font-bold text-white">{metrics.invoiceToDelivery.current}d</span>
                  </div>
                  <TrendChart data={trendInvoiceToDelivery} color="violet" gradientColors={['#8b5cf6', '#a78bfa']} />
                </div>

                <div className="group">
                   <div className="mb-4 flex items-end justify-between">
                    <p className="text-sm font-medium text-gray-400 group-hover:text-cyan-400 transition-colors">Entrega à Entrada</p>
                    <span className="text-xl font-bold text-white">{metrics.deliveryToEntry.current}d</span>
                  </div>
                  <TrendChart data={trendDeliveryToEntry} color="cyan" gradientColors={['#06b6d4', '#22d3ee']} />
                </div>
              </div>
            </div>

            {/* Right Column: Distributions */}
            <div className="glass-panel flex flex-col gap-8 rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-gray-200">
                Performance por Segmento
              </h3>

              <div className="flex flex-col gap-10">
                <div>
                  <p className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-500">Fornecedores</p>
                  <DistributionBar data={distSupplier} maxVal={maxBarValue} />
                </div>
                
                <div className="border-t border-white/5 pt-8">
                  <p className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-500">Cidades</p>
                  <DistributionBar data={distCity} maxVal={maxBarValue} />
                </div>

                 <div className="border-t border-white/5 pt-8">
                  <p className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-500">Lojas</p>
                  <DistributionBar data={distStore} maxVal={maxBarValue} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;