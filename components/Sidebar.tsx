import React, { useState } from 'react';
import { SIDEBAR_ITEMS, ChevronDownIcon } from '../constants';
import type { SidebarNavItem } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  isSidebarOpen: boolean;
  activeView: string;
  setActiveView: (view: string) => void;
  activeSubView: string | null;
  setActiveSubView: (view: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, activeView, setActiveView, activeSubView, setActiveSubView }) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleNavClick = (item: SidebarNavItem) => {
    // Check if the item is expandable (i.e., has a subItems array)
    if (item.subItems !== undefined) {
      // Always toggle the section's open/closed state
      toggleSection(item.id);

      // If the section isn't the currently active one, switch the view to it.
      if (activeView !== item.id) {
        setActiveView(item.id);
        // Default to dashboard if there are sub-items, otherwise it's just a top-level page
        setActiveSubView(item.subItems.length > 0 ? 'dashboard' : null);
      }
    } else {
      // This is for simple links without sub-menus
      setActiveView(item.id);
      setActiveSubView(null);
    }
  };

  const handleSubItemClick = (parentItem: SidebarNavItem, subItem: SidebarNavItem) => {
    setActiveView(parentItem.id);
    setActiveSubView(subItem.id);
  };
  
  const renderNavItem = (item: SidebarNavItem) => {
    const isMainActive = activeView === item.id;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openSections.has(item.id);

    return (
      <li key={item.id}>
        <a
          href={item.href || '#'}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(item);
          }}
          className={cn(
            'flex items-center justify-between rounded-md px-4 py-2 text-sm font-medium transition-smooth',
            isMainActive && !hasSubItems && 'bg-accent text-accent-foreground',
            isMainActive && hasSubItems && 'font-semibold text-foreground',
            !isMainActive && 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
          )}
        >
          <div className="flex items-center space-x-3">
            {item.icon}
            <span>{item.label}</span>
          </div>
          {item.subItems !== undefined && (
            <ChevronDownIcon className={cn(
              'h-5 w-5 transform transition-transform duration-200',
              isOpen && 'rotate-180'
            )} />
          )}
        </a>
        {isOpen && hasSubItems && (
           <ul className="space-y-1 pl-4 pt-1">
            {item.subItems?.map(subItem => {
                const isSubActive = isMainActive && activeSubView === subItem.id;
                return (
                    <li key={subItem.id}>
                        <a
                         href="#"
                         onClick={(e) => {
                            e.preventDefault();
                            handleSubItemClick(item, subItem);
                         }}
                         className={cn(
                           'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-smooth',
                           isSubActive && 'bg-accent text-accent-foreground',
                           !isSubActive && 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                         )}
                        >
                          {subItem.icon}
                          <span>{subItem.label}</span>
                        </a>
                    </li>
                )
            })}
           </ul>
        )}
      </li>
    );
  };

  return (
    <aside className={cn(
      'flex w-64 flex-col bg-card border-r border-border',
      !isSidebarOpen && 'hidden'
    )}>
      <nav className="flex-1 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1 p-2">
          {SIDEBAR_ITEMS.map(renderNavItem)}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
