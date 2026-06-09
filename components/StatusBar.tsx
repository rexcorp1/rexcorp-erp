
import React, { useState, useEffect } from 'react';
import { Wifi, Database, CheckCircle2, Clock, UserCircle, GitBranch } from 'lucide-react';
import type { StatusBarSettings } from '../types';

interface StatusBarProps {
    settings: StatusBarSettings;
}

const StatusBar: React.FC<StatusBarProps> = ({ settings }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateAndTime = (date: Date) => {
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <footer className="flex h-8 flex-shrink-0 items-center justify-between border-t border-gray-200 bg-gray-50 px-6 dark:bg-gray-800 dark:border-gray-700">
      {/* Left side: Status indicators */}
      <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
        {settings.showSystemStatus && (
            <div className="flex items-center space-x-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <span>System: Online</span>
            </div>
        )}
        {settings.showDatabaseStatus && (
            <div className="flex items-center space-x-1.5">
              <Database className="h-3 w-3 text-green-500" />
              <span>Database: OK</span>
            </div>
        )}
        {settings.showSyncStatus && (
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              <span>Sync: OK</span>
            </div>
        )}
        {settings.showVersion && (
            <div className="flex items-center space-x-1.5">
                <GitBranch className="h-3 w-3" />
                <span>v1.0.0</span>
            </div>
        )}
      </div>

      {/* Right side: Time and Currency */}
      <div className="flex items-center space-x-6 text-xs text-gray-600 dark:text-gray-400">
        {settings.showCurrentUser && (
            <div className="flex items-center space-x-1.5">
              <UserCircle className="h-3 w-3" />
              <span>John Doe (JD)</span>
            </div>
        )}
        {settings.showExchangeRate && (
            <div className="font-medium">
                <span>USD/IDR: </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">16,450.50</span>
            </div>
        )}
        {settings.showDateTime && (
            <div className="flex items-center space-x-1.5">
              <Clock className="h-3 w-3" />
              <span>{formatDateAndTime(currentDateTime)}</span>
            </div>
        )}
      </div>
    </footer>
  );
};

export default StatusBar;