

import React, { useState } from 'react';
import { SearchIcon, BellIcon, ChevronDownIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronRightIcon, PanelLeftIcon, PanelRightIcon } from '../constants';
import type { Breadcrumb, CompanySettings } from '../types';
import { cn } from '../lib/utils';

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
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            'rounded p-1.5 text-muted-foreground transition-smooth',
            'hover:bg-accent hover:text-foreground'
          )}
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
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                {getInitials(companySettings.name) || 'REX'}
            </div>
        )}
        
        <nav className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRightIcon className="h-4 w-4" />}
              {crumb.onClick ? (
                <button onClick={crumb.onClick} className="transition-smooth hover:text-foreground hover:underline">
                  {crumb.label}
                </button>
              ) : (
                <span className="font-semibold text-foreground">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search or type a command (Ctrl + G)"
            className={cn(
              'w-80 rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm',
              'text-foreground placeholder-muted-foreground',
              'transition-smooth',
              'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
            )}
          />
        </div>
        <button className="rounded-full p-2 text-muted-foreground transition-smooth hover:bg-accent hover:text-foreground">
          <BellIcon />
        </button>
        <div className="flex items-center space-x-2">
           <button className="flex items-center space-x-1 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground">
             <span className="hidden sm:inline">Help</span>
             <ChevronDownIcon />
           </button>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
          JD
        </div>
      </div>
    </header>
  );
};

export default Header;
