

import React from 'react';
import ShipmentRevenueChart from './ShipmentRevenueChart';
import { 
    DASHBOARD_SUMMARY_CARDS,
    DASHBOARD_QUICK_ACCESS,
    DASHBOARD_REPORTS_MASTERS,
    ArrowUpRightIcon
} from '../constants';
import type { DashboardSummaryCardData, DashboardQuickAccessLink, DashboardReportCategory } from '../types';
import { cn } from '../lib/utils';

const SummaryCard: React.FC<{ card: DashboardSummaryCardData }> = ({ card }) => (
    <div key={card.id} className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
                <card.icon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
                <dl>
                    <dt className="truncate text-sm font-medium text-muted-foreground">{card.title}</dt>
                    <dd>
                        <div className="text-lg font-bold text-foreground">{card.value}</div>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
);


const QuickAccessLink: React.FC<{ link: DashboardQuickAccessLink }> = ({ link }) => (
    <a href="#" key={link.id} className="flex items-center justify-between text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground">
        <div className="flex items-center space-x-3">
            <link.icon className="h-5 w-5 text-muted-foreground" />
            <span>{link.label}</span>
        </div>
        {link.count && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">{link.count}</span>
        )}
    </a>
);


const HomeDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
        {/* Your Shortcuts - Summary Cards */}
        <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Your Shortcuts</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {DASHBOARD_SUMMARY_CARDS.map(card => <SummaryCard key={card.id} card={card} />)}
            </div>
        </div>

        {/* Operational Summary Section */}
        <div className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Operational Summary</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <ShipmentRevenueChart />
                </div>
                <div className="lg:col-span-1">
                    <h3 className="font-semibold text-foreground">Quick Access</h3>
                    <div className="mt-4 flex flex-col gap-4">
                        {DASHBOARD_QUICK_ACCESS.map(link => <QuickAccessLink key={link.id} link={link} />)}
                    </div>
                </div>
            </div>
        </div>
        
        {/* Reports & Masters Section */}
        <div className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Reports & Master Data</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                {DASHBOARD_REPORTS_MASTERS.map(category => (
                    <div key={category.id}>
                        <h3 className="font-semibold text-foreground">{category.title}</h3>
                        <ul className="mt-3 space-y-2">
                            {category.links.map(link => (
                                <li key={link.id}>
                                    <a href="#" className="flex items-center space-x-2 text-sm text-muted-foreground transition-smooth hover:text-foreground">
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
  );
};

export default HomeDashboard;
