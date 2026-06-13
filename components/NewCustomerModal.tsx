import React, { useState } from 'react';
import { XIcon } from '../constants';
import type { Customer } from '../types';

interface NewCustomerModalProps {
    onClose: () => void;
    onEditFullForm: () => void;
    onSave: (customer: Customer) => void;
}

const NewCustomerModal: React.FC<NewCustomerModalProps> = ({ onClose, onEditFullForm, onSave }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState<'Enabled' | 'Disabled'>('Enabled');
    const [group, setGroup] = useState('Corporate');
    const [territory, setTerritory] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [error, setError] = useState('');

    const handleSave = () => {
        if (!name.trim()) {
            setError('Customer Name is required');
            return;
        }

        const newCustomer: Customer = {
            id: String(Date.now()),
            name: name.trim(),
            status,
            group,
            territory,
            originalId: name.trim(),
            lastUpdated: '1s',
            comments: 0,
            likes: 0,
            initials: name.trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        };

        const existingEmails = JSON.parse(localStorage.getItem('CUSTOMER_EMAILS') || '{}');
        const existingPhones = JSON.parse(localStorage.getItem('CUSTOMER_PHONES') || '{}');
        const existingAddresses = JSON.parse(localStorage.getItem('CUSTOMER_ADDRESSES') || '{}');

        existingEmails[newCustomer.id] = email.trim();
        existingPhones[newCustomer.id] = phone.trim();
        existingAddresses[newCustomer.id] = address.trim();

        localStorage.setItem('CUSTOMER_EMAILS', JSON.stringify(existingEmails));
        localStorage.setItem('CUSTOMER_PHONES', JSON.stringify(existingPhones));
        localStorage.setItem('CUSTOMER_ADDRESSES', JSON.stringify(existingAddresses));

        onSave(newCustomer);
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-60 pt-20 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="w-full max-w-2xl transform rounded-lg bg-white dark:bg-gray-800 shadow-xl transition-all my-8 mx-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100" id="modal-title">New Customer</h2>
                    <button 
                        onClick={onClose}
                        className="rounded-full p-1 text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
                        aria-label="Close"
                    >
                        <XIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-6 p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                            {error}
                        </div>
                    )}
                    
                    <div>
                        <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">
                            Customer Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => {
                                setName(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder="Enter Customer Name"
                            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">
                                Customer Group
                            </label>
                            <Select value={group} onValueChange={val => setGroup(val)}>
                                <SelectTrigger className="w-full p-2">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Corporate">Corporate</SelectItem>
                                    <SelectItem value="Commercial">Commercial</SelectItem>
                                    <SelectItem value="Individual">Individual</SelectItem>
                                    <SelectItem value="Government">Government</SelectItem>
                                    <SelectItem value="All">All</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">
                                Status
                            </label>
                            <Select value={status} onValueChange={val => setStatus(val as 'Enabled' | 'Disabled')}>
                                <SelectTrigger className="w-full p-2">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Enabled">Enabled</SelectItem>
                                    <SelectItem value="Disabled">Disabled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 border-b pb-2 mb-3">Primary Contact Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">Email ID</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@example.com"
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">Mobile Number</label>
                                <input 
                                    type="text" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+62..."
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 border-b pb-2 mb-3">Primary Address Details</h3>
                        <div>
                            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">Address</label>
                            <textarea 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter address details..."
                                rows={2}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 rounded-b-lg border-t border-gray-200 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 p-4">
                    <button 
                        onClick={onEditFullForm}
                        className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                        Edit Full Form
                    </button>
                    <button 
                        onClick={handleSave}
                        className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewCustomerModal;
