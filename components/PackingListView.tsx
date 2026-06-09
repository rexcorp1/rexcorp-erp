
import React, { useState } from 'react';
import {
    ChevronDownIcon,
    ListIcon,
    RefreshIcon,
    DotsHorizontalIcon,
    FilterIcon,
    XIcon,
    ArrowUpDownIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    AlignLeftIcon,
    AlignRightIcon,
} from '../constants';
import type { PackingList } from '../types';

interface PackingListViewProps {
    packingLists: PackingList[];
    onPackingListSelect: (packingListId: string) => void;
    onNewPackingList: () => void;
}

const PackingListView: React.FC<PackingListViewProps> = ({ packingLists, onPackingListSelect, onNewPackingList }) => {
    const [isSubPanelOpen, setIsSubPanelOpen] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const getStatusBadge = (status: PackingList['status']) => {
        const baseClasses = "text-xs font-medium me-2 px-2.5 py-0.5 rounded-full";
        switch (status) {
            case 'Confirmed': return <span className={`bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 ${baseClasses}`}>{status}</span>;
            case 'Cancelled': return <span className={`bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 ${baseClasses}`}>{status}</span>;
            case 'Draft': return <span className={`bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 ${baseClasses}`}>{status}</span>;
            default: return null;
        }
    };
    
    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-1 overflow-hidden">
                {/* Filter Sidebar */}
                <aside className={`w-64 flex-shrink-0 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${!isSubPanelOpen ? 'hidden' : 'mr-6'}`}>
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Filter By</h3>
                        <div className="space-y-2">
                            <label htmlFor="shipment-id" className="sr-only">Shipment ID</label>
                            <select id="shipment-id" className="w-full rounded-md border-gray-300 p-2 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"><option>Shipment ID</option></select>
                            <label htmlFor="status" className="sr-only">Status</label>
                            <select id="status" className="w-full rounded-md border-gray-300 p-2 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"><option>Status</option></select>
                        </div>
                        <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">Edit Filters</button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col">
                    {/* Header Actions */}
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-center space-x-2">
                            <button
                              className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                              onClick={() => setIsSubPanelOpen(!isSubPanelOpen)}
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
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
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Packing Lists</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                             <button onClick={onNewPackingList} className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700">+ New Packing List</button>
                        </div>
                    </div>
                    
                    {/* Table Actions */}
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">
                                <FilterIcon className="h-4 w-4"/><span>Filter</span>
                            </button>
                             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:bg-gray-700"><XIcon className="h-4 w-4" /></button>
                             <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Date</span>
                        </div>
                         <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            <span>{packingLists.length} of {packingLists.length}</span>
                         </div>
                    </div>

                    {/* Invoices Table */}
                    <div className="overflow-y-auto custom-scrollbar">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700 sticky top-0 dark:bg-gray-700/50 dark:text-gray-300">
                                <tr>
                                    <th scope="col" className="p-4"><input type="checkbox" className="rounded border-gray-300 dark:bg-gray-900 dark:border-gray-600" /></th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Packing List #</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Date</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Shipment ID</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Billed To</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packingLists.map(pl => (
                                    <tr key={pl.id} className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700/50">
                                        <td className="w-4 p-4"><input type="checkbox" className="rounded border-gray-300 dark:bg-gray-900 dark:border-gray-600"/></td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                            <button onClick={() => onPackingListSelect(pl.id)} className="text-blue-600 hover:underline dark:text-blue-400">
                                                {pl.packingListNumber}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">{pl.packingListDate}</td>
                                        <td className="px-6 py-4 font-semibold text-blue-600 hover:underline dark:text-blue-400">{pl.shipmentId}</td>
                                        <td className="px-6 py-4">{getStatusBadge(pl.status)}</td>
                                        <td className="px-6 py-4">{pl.billToName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackingListView;