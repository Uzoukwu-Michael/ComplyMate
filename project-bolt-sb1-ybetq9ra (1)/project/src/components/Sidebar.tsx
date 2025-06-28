import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  CheckSquare, 
  Bell,
  Settings,
  HelpCircle,
  Crown
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed?: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'contracts', label: 'Contracts', icon: FileText },
  { id: 'documents', label: 'Documents', icon: FolderOpen },
  { id: 'compliance', label: 'Compliance', icon: CheckSquare },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

const bottomItems = [
  { id: 'upgrade', label: 'Upgrade to Pro', icon: Crown },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

export default function Sidebar({ currentPage, onNavigate, isCollapsed = false }: SidebarProps) {
  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} hidden sm:block`}>
      <div className="h-full flex flex-col">
        <nav className="flex-1 pt-6 pb-4">
          <div className="px-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && item.label}
                </button>
              );
            })}
          </div>
        </nav>
        
        <div className="px-3 pb-4 border-t border-gray-200 pt-4">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isUpgrade = item.id === 'upgrade';
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors mb-1 ${
                  isUpgrade
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}