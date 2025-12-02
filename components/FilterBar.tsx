import React from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  options: {
    suppliers: string[];
    cities: string[];
    stores: string[];
  };
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

const Select: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}> = ({ label, value, options, onChange }) => (
  <div className="relative group">
    <select
      className="appearance-none h-10 w-full min-w-[200px] cursor-pointer rounded-full border border-white/10 bg-white/5 pl-5 pr-12 text-sm font-medium text-gray-200 shadow-lg shadow-black/20 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" className="bg-[#18181b] text-gray-400">{label}: Todos</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-[#18181b] text-gray-200">
          {opt}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-hover:text-gray-300">
        <ChevronDown className="h-4 w-4" />
    </div>
  </div>
);

export const FilterBar: React.FC<FilterBarProps> = ({ filters, options, onFilterChange }) => {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4">
 
      <Select
        label="Fornecedor"
        value={filters.supplier}
        options={options.suppliers}
        onChange={(v) => onFilterChange('supplier', v)}
      />
      <Select
        label="Cidade"
        value={filters.city}
        options={options.cities}
        onChange={(v) => onFilterChange('city', v)}
      />
      <Select
        label="Loja"
        value={filters.store}
        options={options.stores}
        onChange={(v) => onFilterChange('store', v)}
      />
    </div>
  );
};