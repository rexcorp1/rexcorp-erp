
import { cn } from '../lib/utils';
import React, { useState } from 'react';
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    AlignLeftIcon,
    AlignRightIcon,
} from '../constants';
import type { ShippingInstruction } from '../types';

interface ShippingInstructionListViewProps {
    shippingInstructions: ShippingInstruction[];
    onSiSelect: (siId: string) => void;
    onNewSi: () => void;
}

const ShippingInstructionListView: React.FC<ShippingInstructionListViewProps> = ({ shippingInstructions, onSiSelect, onNewSi }) => {
    const [isSubPanelOpen, setIsSubPanelOpen] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const getStatusBadge = (status: ShippingInstruction['status']) => {
        const baseClasses = "text-xs font-medium me-2 px-2.5 py-0.5 rounded-full";
        switch (status) {
            case 'Confirmed': return <span className={`bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 ${baseClasses}`}>{status}</span>;
            case 'Cancelled': return <span className={`bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 ${baseClasses}`}>{status}</span>;
            case 'Draft': return <span className={`bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 ${baseClasses}`}>{status}</span>;
            case 'Sent': return <span className={`bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 ${baseClasses}`}>{status}</span>;
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
                            <label htmlFor="forwarder-name" className="sr-only">Forwarder</label>
                            <select id="forwarder-name" className="w-full rounded-md border-gray-300 p-2 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"><option>Forwarder</option></select>
                            <label htmlFor="status" className="sr-only">Status</label>
                            <select id="status" className="w-full rounded-md border-gray-300 p-2 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"><option>Status</option></select>
                        </div>
                        <button className="text-sm font-medium text-primary hover:underline dark:text-primary">Edit Filters</button>
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
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Shipping Instructions</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                             <button onClick={onNewSi} className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-primary dark:hover:opacity-90">+ New SI</button>
                        </div>
                    </div>
                    
                    {/* Table */}
                    <div className="overflow-y-auto custom-scrollbar">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700 sticky top-0 dark:bg-gray-700/50 dark:text-gray-300">
                                <tr>
                                    <th scope="col" className="p-4"><input type="checkbox" className="rounded border-gray-300 dark:bg-gray-900 dark:border-gray-600" /></th>
                                    <th scope="col" className="px-6 py-3 font-semibold">SI #</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Date</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Forwarder</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Consignee</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shippingInstructions.map(si => (
                                    <tr key={si.id} className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700/50">
                                        <td className="w-4 p-4"><input type="checkbox" className="rounded border-gray-300 dark:bg-gray-900 dark:border-gray-600"/></td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                            <button onClick={() => onSiSelect(si.id)} className="text-primary hover:underline dark:text-primary">
                                                {si.shippingInstructionNumber}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">{si.shippingInstructionDate}</td>
                                        <td className="px-6 py-4">{si.toParty}</td>
                                        <td className="px-6 py-4">{si.consigneeName}</td>
                                        <td className="px-6 py-4">{getStatusBadge(si.status)}</td>
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

export default ShippingInstructionListView;