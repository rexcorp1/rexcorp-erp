

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';
import {
    QUOTATION_FUNNEL_DATA,
    SALES_DASHBOARD_SHORTCUTS,
    SALES_DASHBOARD_REPORTS,
    ArrowUpRightIcon,
    FilterIcon,
    DotsHorizontalIcon,
} from '../constants';
import type { ReportCategory } from '../types';

// Chart Component
const QuotationFunnelChart: React.FC = () => {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Quotation Funnel</h3>
                <div className="flex items-center space-x-2">
                    <button className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"><FilterIcon /></button>
                    <button className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"><DotsHorizontalIcon /></button>
                </div>
            </div>
            <div className="mt-6 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={QUOTATION_FUNNEL_DATA}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} width={80} />
                        <Tooltip
                            cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
                            contentStyle={{
                                background: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.5rem',
                            }}
                        />
                        <Bar dataKey="value" fill="#3B82F6" barSize={30}>
                             <LabelList dataKey="value" position="right" style={{ fill: '#1F2937', fontSize: 12 }} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// Main Dashboard Component
const SalesClientsDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="mb-2 flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Sales & Clients Dashboard</h1>
            </div>

            <QuotationFunnelChart />

            <div className="space-y-8 rounded-lg border border-gray-200 bg-white p-8 dark:bg-gray-800 dark:border-gray-700">
                {/* Quick Access Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Quick Access</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
                        {SALES_DASHBOARD_SHORTCUTS.map(shortcut => (
                            <a href="#" key={shortcut.id} className="group flex items-center text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                               <div className="flex items-center">
                                    <span>{shortcut.label}</span>
                                    <ArrowUpRightIcon />
                               </div>
                            </a>
                        ))}
                    </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                {/* Reports & Masters Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Reports & Masters</h2>
                    <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {SALES_DASHBOARD_REPORTS.map((category) => (
                            <div key={category.id}>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{category.title}</h3>
                                <ul className="space-y-2">
                                    {category.links.map(link => (
                                        <li key={link.id}>
                                            <a href="#" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                                                <span>{link.label}</span>
                                                <ArrowUpRightIcon />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesClientsDashboard;