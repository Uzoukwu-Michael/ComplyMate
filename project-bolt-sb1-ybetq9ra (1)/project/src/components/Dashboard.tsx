import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Users, 
  TrendingUp,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Contract, Document, Notification, ComplianceItem } from '../types';

interface DashboardProps {
  contracts: Contract[];
  documents: Document[];
  notifications: Notification[];
  complianceItems: ComplianceItem[];
  onNavigate: (page: string) => void;
}

export default function Dashboard({ 
  contracts, 
  documents, 
  notifications, 
  complianceItems, 
  onNavigate 
}: DashboardProps) {
  const urgentNotifications = notifications.filter(n => n.priority === 'urgent' && !n.read);
  const pendingContracts = contracts.filter(c => c.status === 'draft' || c.status === 'sent');
  const missingDocuments = documents.filter(d => d.status === 'pending');
  const overdueItems = complianceItems.filter(c => c.status === 'overdue');

  const stats = [
    {
      title: 'Active Contracts',
      value: contracts.filter(c => c.status === 'signed').length,
      total: contracts.length,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+2 this month'
    },
    {
      title: 'Pending Documents',
      value: missingDocuments.length,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      urgent: missingDocuments.length > 0
    },
    {
      title: 'Compliance Score',
      value: Math.round(((complianceItems.filter(c => c.status === 'completed').length) / complianceItems.length) * 100),
      suffix: '%',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Urgent Actions',
      value: urgentNotifications.length + overdueItems.length,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      urgent: urgentNotifications.length + overdueItems.length > 0
    }
  ];

  const quickActions = [
    {
      title: 'Create Contract',
      description: 'Generate a new client contract',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => onNavigate('contracts')
    },
    {
      title: 'Upload Document',
      description: 'Add client documents or forms',
      icon: Plus,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => onNavigate('documents')
    },
    {
      title: 'Check Compliance',
      description: 'Review compliance status',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: () => onNavigate('compliance')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h1>
        <p className="text-blue-100">Here's your compliance overview for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <div className="flex items-baseline space-x-1">
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                      {stat.suffix && <span className="text-lg">{stat.suffix}</span>}
                    </p>
                    {stat.total && (
                      <p className="text-sm text-gray-500">/ {stat.total}</p>
                    )}
                  </div>
                  {stat.change && (
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              {stat.urgent && (
                <div className="mt-3 flex items-center space-x-1 text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-xs font-medium">Needs attention</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
              >
                <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Alerts */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Urgent Alerts</h2>
            {urgentNotifications.length > 0 && (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {urgentNotifications.length} urgent
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            {urgentNotifications.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-600">All caught up! No urgent alerts.</p>
              </div>
            ) : (
              urgentNotifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-red-900">{notification.title}</p>
                    <p className="text-sm text-red-700">{notification.message}</p>
                  </div>
                </div>
              ))
            )}
            
            {urgentNotifications.length > 3 && (
              <button
                onClick={() => onNavigate('notifications')}
                className="w-full text-center py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all alerts
              </button>
            )}
          </div>
        </div>

        {/* Recent Contracts */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Contracts</h2>
            <button
              onClick={() => onNavigate('contracts')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {contracts.slice(0, 3).map((contract) => {
              const statusColors = {
                draft: 'bg-gray-100 text-gray-800',
                sent: 'bg-blue-100 text-blue-800',
                signed: 'bg-green-100 text-green-800',
                expired: 'bg-red-100 text-red-800'
              };
              
              return (
                <div key={contract.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{contract.title}</p>
                    <p className="text-sm text-gray-600">{contract.clientName}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[contract.status]}`}>
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}