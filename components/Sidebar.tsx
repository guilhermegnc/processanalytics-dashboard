import React from 'react';
import { LayoutDashboard, FileText, ShoppingBag, Store, Settings, HelpCircle, LogOut, LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active }) => (
  <a
    href="#"
    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active
        ? 'bg-primary/10 text-primary dark:bg-primary/20'
        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
    }`}
  >
    <Icon className={`h-5 w-5 ${active ? 'fill-current' : ''}`} />
    <span>{label}</span>
  </a>
);

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-background-dark lg:flex">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/30">
          <LayoutDashboard className="h-5 w-5" />
        </div>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">ProcessAnalytics</h1>
      </div>

      <div className="flex flex-grow flex-col justify-between">
        <nav className="flex flex-col gap-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
          <SidebarItem icon={FileText} label="Relatórios" />
          <SidebarItem icon={ShoppingBag} label="Fornecedores" />
          <SidebarItem icon={Store} label="Lojas" />
          <SidebarItem icon={Settings} label="Configurações" />
        </nav>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 border-t border-gray-200 pt-4 dark:border-gray-800">
            <SidebarItem icon={HelpCircle} label="Ajuda" />
            <SidebarItem icon={LogOut} label="Sair" />
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50">
            <img 
                src="https://picsum.photos/100/100" 
                alt="User" 
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-gray-700"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Ana Silva</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Gerente de Ops</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
