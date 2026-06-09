import React, { useState } from 'react';
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
import type { CustomerContract } from '../types';

interface CustomerContractListViewProps {
    contracts: CustomerContract[];
    onContractSelect: (contract: CustomerContract) => void;
    onAddContract: () => void;
    isSubPanelOpen: boolean;
    toggleSubPanel: () => void;
}

const CustomerContractListView: React.FC<CustomerContractListViewProps> = ({ 
    contracts,
    onContractSelect, 
    onAddContract, 
    isSubPanelOpen, 
    toggleSubPanel 
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const getStatusBadge = (status: CustomerContract['status']) => {
        const baseClasses = "text-xs font-medium me-2 px-2.5 py-0.5 rounded-full";
        switch (status) {
            case 'Active': return <span className={`bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 ${baseClasses}`}>{status}</span>;
            case 'Terminated':
            case 'Expired': return <span className={`bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 ${baseClasses}`}>{status}</span>;
            case 'Draft': return <span className={`bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 ${baseClasses}`}>{status}</span>;
            default: return null;
        }
    };

    const filteredContracts = contracts.filter(c => {
        const query = searchQuery.toLowerCase();
        return (
            c.customerName.toLowerCase().includes(query) ||
            c.contractId.toLowerCase().includes(query) ||
            c.status.toLowerCase().includes(query)
        );
    });
    
    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-1 overflow-hidden">
                {/* Filter Sidebar */}
                <aside className={`w-64 flex-shrink-0 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${!isSubPanelOpen ? 'hidden' : 'mr-6'}`}>
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Filter By</h3>
                        <div className="space-y-2">
                            <label htmlFor="customer-name" className="sr-only">Customer Name</label>
                            <select id="customer-name" className="w-full rounded-md border-gray-300 p-2 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"><option>Customer Name</option></select>
                            <label htmlFor="status" className="sr-only">Status</label>
                            <select id="status" className="w-full rounded-md border-gray-300 p-2 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"><option>Status</option></select>
                        </div>
                        <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">Edit Filters</button>
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
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
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
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Customer Contracts</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                             <button className="flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">
                                <ListIcon className="h-4 w-4"/><span>List View</span><ChevronDownIcon className="h-4 w-4" />
                            </button>
                             <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"><RefreshIcon className="h-4 w-4" /></button>
                             <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"><DotsHorizontalIcon className="h-4 w-4" /></button>
                             <button onClick={onAddContract} className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700">+ Add Contract</button>
                        </div>
                    </div>
                    
                    {/* Search Field */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                            <input 
                                type="text" 
                                placeholder="Search Customer Name or Contract ID..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="rounded-md border border-gray-300 text-sm shadow-sm w-80 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="text-xs text-red-500 hover:underline">Clear</button>
                            )}
                        </div>
                    </div>

                    {/* Table Actions */}
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">
                                <FilterIcon className="h-4 w-4"/><span>Filter</span>
                            </button>
                             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:bg-gray-700"><XIcon className="h-4 w-4" /></button>
                             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:bg-gray-700"><ArrowUpDownIcon className="h-4 w-4" /></button>
                             <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Start Date</span>
                        </div>
                         <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            <span>{filteredContracts.length} of {contracts.length}</span>
                            <button className="p-1 text-gray-400 hover:text-red-500"><HeartIcon className="h-5 w-5"/></button>
                         </div>
                    </div>

                    {/* Contracts Table */}
                    <div className="overflow-y-auto custom-scrollbar">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700 sticky top-0 dark:bg-gray-700/50 dark:text-gray-300">
                                <tr>
                                    <th scope="col" className="p-4"><input type="checkbox" className="rounded border-gray-300 dark:bg-gray-900 dark:border-gray-600" /></th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Contract ID</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Customer Name</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Start Date</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">End Date</th>
                                    <th scope="col" className="px-6 py-3 font-semibold text-right">Total Value</th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContracts.map(contract => (
                                    <tr key={contract.id} className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700/50">
                                        <td className="w-4 p-4"><input type="checkbox" className="rounded border-gray-300 dark:bg-gray-900 dark:border-gray-600"/></td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                            <button onClick={() => onContractSelect(contract)} className="text-blue-600 hover:underline dark:text-blue-400 font-bold">
                                                {contract.contractId}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{contract.customerName}</td>
                                        <td className="px-6 py-4">{getStatusBadge(contract.status)}</td>
                                        <td className="px-6 py-4">{contract.startDate}</td>
                                        <td className="px-6 py-4">{contract.endDate}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 text-right dark:text-white">{contract.totalValue}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end space-x-3 text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                                                    <CommentIcon className="w-4 h-4"/>
                                                    <span>{contract.comments}</span>
                                                </div>
                                                <div className="flex items-center space-x-1 hover:text-red-500 cursor-pointer">
                                                    <HeartIcon className="w-4 h-4"/>
                                                    <span>{contract.likes}</span>
                                                </div>
                                                <button className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"><DotsHorizontalIcon className="w-4 h-4"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredContracts.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="py-8 text-center text-gray-500 dark:text-gray-400 italic">No contracts found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerContractListView;
