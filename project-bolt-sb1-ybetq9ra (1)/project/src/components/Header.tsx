import React from 'react';
import { Bell, Settings, User, LogOut, CreditCard } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType;
  notificationCount: number;
  onNavigate: (page: string) => void;
}

export default function Header({ user, notificationCount, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:inline">ComplyMate</span>
          </button>
          
          {user.subscription === 'free' && (
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 rounded-full border border-blue-200">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">
                Free Trial: {Math.ceil((new Date(user.trialEndsAt!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('notifications')}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
              <span className="font-medium text-gray-900 hidden sm:inline">{user.name}</span>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <User className="w-4 h-4" />
                <span>Profile Settings</span>
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <Settings className="w-4 h-4" />
                <span>App Settings</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={() => onNavigate('login')}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}