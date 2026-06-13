import React, { useState } from 'react';
import NewCustomerModal from './NewCustomerModal';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
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
import { Checkbox } from '@/components/ui/checkbox';

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
                    <aside className={`w-64 flex-shrink-0 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${!isSubPanelOpen ? 'hidden' : 'mr-6'}`}>
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Filter By</h3>
                            
                            <div className="space-y-2">
                                <label htmlFor="assigned-to" className="sr-only">Assigned To</label>
                                <Select disabled>
                                    <SelectTrigger className="w-full p-2">
                                        <SelectValue placeholder="Assigned To" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="placeholder" disabled>No items</SelectItem>
                                    </SelectContent>
                                </Select>
                                
                                <label htmlFor="created-by" className="sr-only">Created By</label>
                                <Select disabled>
                                    <SelectTrigger className="w-full p-2">
                                        <SelectValue placeholder="Created By" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="placeholder" disabled>No items</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">Edit Filters</button>

                             <div className="space-y-2">
                                <label htmlFor="tags" className="sr-only">Tags</label>
                                <Select disabled>
                                    <SelectTrigger className="w-full p-2">
                                        <SelectValue placeholder="Tags" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="placeholder" disabled>No items</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">Show Tags</button>
                            
                            <div className="space-y-2 border-t pt-4 dark:border-gray-600">
                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Save Filter</h3>
                                 <label htmlFor="filter-name" className="sr-only">Filter Name</label>
                                 <input type="text" id="filter-name" placeholder="Filter Name" className="w-full rounded-md border-gray-300 bg-gray-100 p-2 text-sm placeholder-gray-500 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col">
                        {/* Header Actions */}
                        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                            <div className="flex items-center space-x-2">
                                <button
                                  className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
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
                                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Customer</h1>
                            </div>
                             <div className="flex items-center space-x-2">
                                <button className="flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">
                                    <ListIcon className="h-4 w-4"/>
                                    <span>List View</span>
                                    <ChevronDownIcon className="h-4 w-4" />
                                </button>
                                 <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"><RefreshIcon className="h-4 w-4" /></button>
                                 <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"><DotsHorizontalIcon className="h-4 w-4" /></button>
                                 <button onClick={() => setIsModalOpen(true)} className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700">+ Add Customer</button>
                             </div>
                        </div>
                        
                        {/* Search Pills */}
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="text" 
                                    placeholder="Search Customer..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="rounded-md border border-gray-300 text-sm shadow-sm w-full md:w-80 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="text-xs text-red-500 font-semibold hover:underline"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Table Actions */}
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-2">
                                <button className="flex items-center space-x-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">
                                    <FilterIcon className="h-4 w-4"/>
                                    <span>Filter</span>
                                </button>
                                 <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:bg-gray-700"><XIcon className="h-4 w-4" /></button>
                                 <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:bg-gray-700"><ArrowUpDownIcon className="h-4 w-4" /></button>
                                 <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Last Updated On</span>
                            </div>
                             <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                <span>{filteredCustomers.length} of {customers.length}</span>
                                <button className="p-1 text-gray-400 hover:text-red-500"><HeartIcon className="h-5 w-5"/></button>
                             </div>
                        </div>

                        {/* Customer Table */}
                        <div className="overflow-y-auto custom-scrollbar">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="bg-gray-50 text-xs uppercase text-gray-700 sticky top-0 dark:bg-gray-700/50 dark:text-gray-300">
                                    <tr>
                                        <th scope="col" className="p-4"><Checkbox className="rounded border-gray-300 dark:bg-gray-900 dark:border-gray-600" /></th>
                                        <th scope="col" className="px-6 py-3 font-semibold">Customer Name</th>
                                        <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                                        <th scope="col" className="px-6 py-3 font-semibold">Customer Group</th>
                                        <th scope="col" className="px-6 py-3 font-semibold">ID</th>
                                        <th scope="col" className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.map(customer => (
                                        <tr key={customer.id} className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700/50">
                                            <td className="w-4 p-4"><Checkbox className="rounded border-gray-300 dark:bg-gray-900 dark:border-gray-600"/></td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                <button onClick={() => onCustomerSelect(customer)} className="text-blue-600 hover:underline dark:text-blue-400 font-bold">
                                                    {customer.name}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${
                                                    customer.status === 'Enabled' 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' 
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                                                }`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{customer.group}</td>
                                            <td className="px-6 py-4 text-xs font-mono">{customer.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                                                    {customer.initials && (
                                                        <span className="text-xs font-bold text-purple-600 bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center dark:bg-purple-900 dark:text-purple-300">{customer.initials}</span>
                                                    )}
                                                    <span className="text-xs">{customer.lastUpdated}</span>
                                                    <div className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                                                        <CommentIcon className="w-4 h-4"/>
                                                        <span>{customer.comments}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1 hover:text-red-500 cursor-pointer">
                                                        <HeartIcon className="w-4 h-4"/>
                                                        <span>{customer.likes}</span>
                                                    </div>
                                                    <button className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"><DotsHorizontalIcon className="w-4 h-4"/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredCustomers.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-gray-500 dark:text-gray-400 italic">No customers found.</td>
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
