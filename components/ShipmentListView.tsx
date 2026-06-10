

import { cn } from '../lib/utils';
import React, { useState } from 'react';
import {
    ChevronDownIcon,
    FilterIcon,
    XIcon,
    DotsHorizontalIcon,
    PlusIcon,
    ShipIcon,
    TruckIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    AlignLeftIcon,
    AlignRightIcon,
} from '../constants';
import type { Shipment } from '../types';
import { SHIPMENTS_DATA } from '../constants';
import { Plane } from 'lucide-react';

interface ShipmentListViewProps {
    onShipmentSelect: (shipmentId: string) => void;
    isSubPanelOpen: boolean;
    toggleSubPanel: () => void;
}

const ShipmentListView: React.FC<ShipmentListViewProps> = ({ onShipmentSelect, isSubPanelOpen, toggleSubPanel }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const getStatusBadge = (status: Shipment['status']) => {
        const baseClasses = "text-xs font-medium me-2 px-2.5 py-0.5 rounded-full whitespace-nowrap";
        switch (status) {
            case 'In Transit': return <span className={`bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 ${baseClasses}`}>{status}</span>;
            case 'Customs Clearance': return <span className={`bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 ${baseClasses}`}>{status}</span>;
            case 'Delivered': return <span className={`bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 ${baseClasses}`}>{status}</span>;
            case 'Booked': return <span className={`bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 ${baseClasses}`}>{status}</span>;
            case 'On Hold': return <span className={`bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 ${baseClasses}`}>{status}</span>;
            default: return null;
        }
    };

    const getModeIcon = (mode: Shipment['mode']) => {
        switch (mode) {
            case 'Sea': return <ShipIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />;
            case 'Air': return <Plane className="h-5 w-5 text-gray-500 dark:text-gray-400" />;
            case 'Land': return <TruckIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />;
        }
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-1 overflow-hidden">
                {/* Filter Sidebar */}
                <aside className={`w-64 flex-shrink-0 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${!isSubPanelOpen ? 'hidden' : 'mr-6'}`}>
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Filter By</h3>
                        <div className="space-y-2">
                            <label htmlFor="status-filter" className="sr-only">Status</label>
                            <select id="status-filter" className="w-full rounded-md border-gray-300 p-2 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <option>Status</option>
                                <option>In Transit</option>
                                <option>Customs Clearance</option>
                                <option>Delivered</option>
                            </select>
                            <label htmlFor="mode-filter" className="sr-only">Mode</label>
                            <select id="mode-filter" className="w-full rounded-md border-gray-300 p-2 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <option>Mode of Transport</option>
                                <option>Sea</option>
                                <option>Air</option>
                                <option>Land</option>
                            </select>
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
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Shipments</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 flex items-center space-x-2 dark:bg-primary dark:hover:opacity-90">
                                <PlusIcon className="h-4 w-4" />
                                <span>New Shipment</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Actions */}
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">
                                <FilterIcon className="h-4 w-4"/><span>Filter</span>
                            </button>
                            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:bg-gray-700"><XIcon className="h-4 w-4" /></button>
                        </div>
                         <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            <span>{SHIPMENTS_DATA.length} of {SHIPMENTS_DATA.length}</span>
                         </div>
                    </div>

                    {/* Shipments Table */}
                    <div className="overflow-y-auto custom-scrollbar">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700 sticky top-0 dark:bg-gray-700/50 dark:text-gray-300">
                                <tr>
                                    <th scope="col" className="p-4"><input type="checkbox" className="rounded border-gray-300 dark:bg-gray-900 dark:border-gray-600" /></th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Shipment ID</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Client</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Route</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                                    <th scope="col" className="px-6 py-3 font-semibold text-center">Mode</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">ETD</th>
                                    <th scope="col" className="px-6 py-3 font-semibold">ETA</th>
                                    <th scope="col" className="px-6 py-3">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SHIPMENTS_DATA.map(shipment => (
                                    <tr key={shipment.id} className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700/50">
                                        <td className="w-4 p-4"><input type="checkbox" className="rounded border-gray-300 dark:bg-gray-900 dark:border-gray-600"/></td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                            <button onClick={() => onShipmentSelect(shipment.id)} className="text-primary hover:underline dark:text-primary">
                                                {shipment.shipmentId}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">{shipment.clientName}</td>
                                        <td className="px-6 py-4">{shipment.origin} &rarr; {shipment.destination}</td>
                                        <td className="px-6 py-4">{getStatusBadge(shipment.status)}</td>
                                        <td className="px-6 py-4 flex justify-center">{getModeIcon(shipment.mode)}</td>
                                        <td className="px-6 py-4">{shipment.etd}</td>
                                        <td className="px-6 py-4">{shipment.eta}</td>
                                        <td className="px-6 py-4 text-xs">{shipment.lastUpdated}</td>
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

export default ShipmentListView;