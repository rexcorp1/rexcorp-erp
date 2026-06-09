

import React, { useState } from 'react';
import { SearchIcon, BellIcon, ChevronDownIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronRightIcon, PanelLeftIcon, PanelRightIcon } from '../constants';
import type { Breadcrumb, CompanySettings } from '../types';

interface HeaderProps {
  toggleSidebar: () => void;
  breadcrumbs: Breadcrumb[];
  isSidebarOpen: boolean;
  companySettings: CompanySettings;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, breadcrumbs, isSidebarOpen, companySettings }) => {
  const [isHovered, setIsHovered] = useState(false);
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 3).toUpperCase();

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isHovered ? (
            isSidebarOpen ? (
              <ChevronDoubleLeftIcon className="h-5 w-5" />
            ) : (
              <ChevronDoubleRightIcon className="h-5 w-5" />
            )
          ) : isSidebarOpen ? (
            <PanelLeftIcon className="h-5 w-5" />
          ) : (
            <PanelRightIcon className="h-5 w-5" />
          )}
        </button>
        {companySettings.logo ? (
            <img src={companySettings.logo} alt={`${companySettings.name} Logo`} className="h-8 w-auto" />
        ) : (
            <div className="flex h-8 items-center justify-center rounded-md bg-black px-3 text-sm font-bold text-white">
                {getInitials(companySettings.name) || 'REX'}
            </div>
        )}
        
        <nav className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRightIcon className="h-4 w-4" />}
              {crumb.onClick ? (
                <button onClick={crumb.onClick} className="hover:text-gray-800 hover:underline dark:hover:text-gray-200">
                  {crumb.label}
                </button>
              ) : (
                <span className="text-gray-800 font-semibold dark:text-gray-100">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search or type a command (Ctrl + G)"
            className="w-80 rounded-md border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200">
          <BellIcon />
        </button>
        <div className="flex items-center space-x-2">
           <button className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
             <span>Help</span>
             <ChevronDownIcon />
           </button>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-900 dark:text-green-300">
          JD
        </div>
      </div>
    </header>
  );
};

export default Header;