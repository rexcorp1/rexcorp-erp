import React, { useState } from 'react';
import NewCustomerModal from './NewCustomerModal';
import {
    ChevronDownIcon,
    ListIcon,
    RefreshIcon,
    DotsHorizontalIcon,
    FilterIcon,
    XIcon,
    ArrowUpDownIcon,
    CommentIcon,
    HeartIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    AlignLeftIcon,
    AlignRightIcon,
} from '../constants';
import type { Customer } from '../types';
import { cn } from '../lib/utils';

interface CustomerManagementViewProps {
    customers: Customer[];
    onCustomerSelect: (customer: Customer) => void;
    onAddNew: () => void;
    onSaveCustomer: (customer: Customer) => void;
    isSubPanelOpen: boolean;
    toggleSubPanel: () => void;
}

const CustomerManagementView: React.FC<CustomerManagementViewProps> = ({ 
    customers, 
    onCustomerSelect, 
    onAddNew, 
    onSaveCustomer, 
    isSubPanelOpen, 
    toggleSubPanel 
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleEditFullForm = () => {
        setIsModalOpen(false);
        onAddNew();
    };

    // Filter customers based on search query
    const filteredCustomers = customers.filter(customer => {
        const query = searchQuery.toLowerCase();
        return (
            customer.name.toLowerCase().includes(query) ||
            customer.group.toLowerCase().includes(query) ||
            customer.id.includes(query) ||
            customer.originalId.toLowerCase().includes(query)
        );
    });
    
    return (
        <>
            <div className="flex h-full flex-col">
                <div className="flex flex-1 overflow-hidden">
                    {/* Filter Sidebar */}
                    <aside className={cn(
                      'w-64 flex-shrink-0 bg-card p-4 rounded-lg border border-border',
                      !isSubPanelOpen && 'hidden',
                      isSubPanelOpen && 'mr-6'
                    )}>
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-foreground">Filter By</h3>
                            
                            <div className="space-y-2">
                                <label htmlFor="assigned-to" className="sr-only">Assigned To</label>
                                <select id="assigned-to" className={cn(
                                  'w-full rounded-md border border-input bg-background p-2 text-sm',
                                  'text-foreground placeholder-muted-foreground',
                                  'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                )}>
                                    <option>Assigned To</option>
                                </select>
                                
                                <label htmlFor="created-by" className="sr-only">Created By</label>
                                <select id="created-by" className={cn(
                                  'w-full rounded-md border border-input bg-background p-2 text-sm',
                                  'text-foreground placeholder-muted-foreground',
                                  'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                )}>
                                    <option>Created By</option>
                                </select>
                            </div>

                            <button className="text-sm font-medium text-primary transition-smooth hover:underline">Edit Filters</button>

                             <div className="space-y-2">
                                <label htmlFor="tags" className="sr-only">Tags</label>
                                <select id="tags" className={cn(
                                  'w-full rounded-md border border-input bg-background p-2 text-sm',
                                  'text-foreground placeholder-muted-foreground',
                                  'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                )}>
                                    <option>Tags</option>
                                </select>
                            </div>
                            <button className="text-sm font-medium text-primary transition-smooth hover:underline">Show Tags</button>
                            
                            <div className="space-y-2 border-t border-border pt-4">
                                 <h3 className="text-sm font-semibold text-foreground">Save Filter</h3>
                                 <label htmlFor="filter-name" className="sr-only">Filter Name</label>
                                 <input type="text" id="filter-name" placeholder="Filter Name" className={cn(
                                   'w-full rounded-md border border-input bg-accent p-2 text-sm',
                                   'text-foreground placeholder-muted-foreground',
                                   'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                 )}/>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 rounded-lg border border-border bg-card flex flex-col">
                        {/* Header Actions */}
                        <div className="flex items-center justify-between border-b border-border p-4">
                            <div className="flex items-center gap-2">
                                <button
                                  className={cn(
                                    'rounded p-1 text-muted-foreground transition-smooth',
                                    'hover:bg-accent hover:text-foreground'
                                  )}
                                  onClick={toggleSubPanel}
                                  onMouseEnter={() => setIsHovered(true)}
                                  onMouseLeave={() => setIsHovered(false)}
                                  aria-label={isSubPanelOpen ? 'Collapse sub-panel' : 'Expand sub-panel'}
                                >
                                  {isHovered ? (
                                    isSubPanelOpen ? (
                                      <ChevronDoubleLeftIcon className="h-5 w-5" />
                                    ) : (
                                      <ChevronDoubleRightIcon className="h-5 w-5" />
                                    )
                                  ) : isSubPanelOpen ? (
                                    <AlignLeftIcon className="h-5 w-5" />
                                  ) : (
                                    <AlignRightIcon className="h-5 w-5" />
                                  )}
                                </button>
                                <h1 className="text-2xl font-bold text-foreground">Customer</h1>
                            </div>
                             <div className="flex items-center gap-2">
                                <button className={cn(
                                  'flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium',
                                  'text-foreground transition-smooth',
                                  'hover:bg-accent'
                                )}>
                                    <ListIcon className="h-4 w-4"/>
                                    <span>List View</span>
                                    <ChevronDownIcon className="h-4 w-4" />
                                </button>
                                 <button className={cn(
                                   'rounded-md p-2 text-muted-foreground transition-smooth',
                                   'hover:bg-accent hover:text-foreground'
                                 )}><RefreshIcon className="h-4 w-4" /></button>
                                 <button className={cn(
                                   'rounded-md p-2 text-muted-foreground transition-smooth',
                                   'hover:bg-accent hover:text-foreground'
                                 )}><DotsHorizontalIcon className="h-4 w-4" /></button>
                                 <button onClick={() => setIsModalOpen(true)} className={cn(
                                   'rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground',
                                   'transition-smooth hover:opacity-90'
                                 )}>+ Add Customer</button>
                             </div>
                        </div>
                        
                        {/* Search Pills */}
                        <div className="p-4 border-b border-border">
                            <div className="flex items-center gap-2">
                                <input 
                                    type="text" 
                                    placeholder="Search Customer..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={cn(
                                      'rounded-md border border-input bg-background text-sm w-full md:w-80 px-3 py-2',
                                      'text-foreground placeholder-muted-foreground',
                                      'transition-smooth',
                                      'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                    )}
                                />
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="text-xs font-semibold text-destructive transition-smooth hover:underline"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Table Actions */}
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-2">
                                <button className={cn(
                                  'flex items-center gap-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium',
                                  'text-foreground transition-smooth',
                                  'hover:bg-accent'
                                )}>
                                    <FilterIcon className="h-4 w-4"/>
                                    <span>Filter</span>
                                </button>
                                 <button className={cn(
                                   'p-2 text-muted-foreground transition-smooth rounded-md',
                                   'hover:bg-accent hover:text-foreground'
                                 )}><XIcon className="h-4 w-4" /></button>
                                 <button className={cn(
                                   'p-2 text-muted-foreground transition-smooth rounded-md',
                                   'hover:bg-accent hover:text-foreground'
                                 )}><ArrowUpDownIcon className="h-4 w-4" /></button>
                                 <span className="text-sm font-semibold text-foreground">Last Updated On</span>
                            </div>
                             <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <span>{filteredCustomers.length} of {customers.length}</span>
                                <button className="p-1 text-muted-foreground transition-smooth hover:text-destructive"><HeartIcon className="h-5 w-5"/></button>
                             </div>
                        </div>

                        {/* Customer Table */}
                        <div className="overflow-y-auto custom-scrollbar">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-accent text-xs uppercase font-semibold text-accent-foreground sticky top-0">
                                    <tr>
                                        <th scope="col" className="p-4"><input type="checkbox" className="rounded border-border" /></th>
                                        <th scope="col" className="px-6 py-3">Customer Name</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Customer Group</th>
                                        <th scope="col" className="px-6 py-3">ID</th>
                                        <th scope="col" className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.map(customer => (
                                        <tr key={customer.id} className="border-b border-border hover:bg-accent/30 transition-smooth">
                                            <td className="w-4 p-4"><input type="checkbox" className="rounded border-border"/></td>
                                            <td className="px-6 py-4 font-semibold text-foreground whitespace-nowrap">
                                                <button onClick={() => onCustomerSelect(customer)} className="text-primary transition-smooth hover:underline font-bold">
                                                    {customer.name}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                  'text-xs font-medium px-2.5 py-0.5 rounded-full',
                                                  customer.status === 'Enabled' 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' 
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                                                )}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-foreground">{customer.group}</td>
                                            <td className="px-6 py-4 text-xs font-mono text-muted-foreground">{customer.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3 text-muted-foreground">
                                                    {customer.initials && (
                                                        <span className="text-xs font-bold bg-secondary text-secondary-foreground rounded-full w-6 h-6 flex items-center justify-center">{customer.initials}</span>
                                                    )}
                                                    <span className="text-xs">{customer.lastUpdated}</span>
                                                    <div className="flex items-center gap-1 transition-smooth hover:text-foreground cursor-pointer">
                                                        <CommentIcon className="w-4 h-4"/>
                                                        <span>{customer.comments}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 transition-smooth hover:text-destructive cursor-pointer">
                                                        <HeartIcon className="w-4 h-4"/>
                                                        <span>{customer.likes}</span>
                                                    </div>
                                                    <button className="text-muted-foreground transition-smooth hover:text-foreground"><DotsHorizontalIcon className="w-4 h-4"/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredCustomers.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-muted-foreground italic">No customers found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <NewCustomerModal
                    onClose={() => setIsModalOpen(false)}
                    onEditFullForm={handleEditFullForm}
                    onSave={onSaveCustomer}
                />
            )}
        </>
    );
};

export default CustomerManagementView;
