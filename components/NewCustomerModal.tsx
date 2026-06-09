import React, { useState } from 'react';
import { XIcon } from '../constants';
import type { Customer } from '../types';
import { cn } from '../lib/utils';

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
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="w-full max-w-2xl transform rounded-lg bg-card shadow-lg transition-all my-8 mx-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border p-4">
                    <h2 className="text-lg font-semibold text-foreground" id="modal-title">New Customer</h2>
                    <button 
                        onClick={onClose}
                        className={cn(
                          'rounded-full p-1 text-muted-foreground transition-smooth',
                          'hover:bg-accent hover:text-foreground'
                        )}
                        aria-label="Close"
                    >
                        <XIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-6 p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {error && (
                        <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded text-sm">
                            {error}
                        </div>
                    )}
                    
                    <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">
                            Customer Name <span className="text-destructive">*</span>
                        </label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => {
                                setName(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder="Enter Customer Name"
                            className={cn(
                              'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                              'text-foreground placeholder-muted-foreground',
                              'transition-smooth',
                              'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">
                                Customer Group
                            </label>
                            <select 
                                value={group} 
                                onChange={(e) => setGroup(e.target.value)}
                                className={cn(
                                  'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                                  'text-foreground',
                                  'transition-smooth',
                                  'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                )}
                            >
                                <option value="Corporate">Corporate</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Individual">Individual</option>
                                <option value="Government">Government</option>
                                <option value="All">All</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">
                                Status
                            </label>
                            <select 
                                value={status} 
                                onChange={(e) => setStatus(e.target.value as 'Enabled' | 'Disabled')}
                                className={cn(
                                  'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                                  'text-foreground',
                                  'transition-smooth',
                                  'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                )}
                            >
                                <option value="Enabled">Enabled</option>
                                <option value="Disabled">Disabled</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2 mb-3">Primary Contact Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-foreground mb-1 block">Email ID</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@example.com"
                                    className={cn(
                                      'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                                      'text-foreground placeholder-muted-foreground',
                                      'transition-smooth',
                                      'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                    )}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-foreground mb-1 block">Mobile Number</label>
                                <input 
                                    type="text" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+62..."
                                    className={cn(
                                      'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                                      'text-foreground placeholder-muted-foreground',
                                      'transition-smooth',
                                      'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2 mb-3">Primary Address Details</h3>
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Address</label>
                            <textarea 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter address details..."
                                rows={2}
                                className={cn(
                                  'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                                  'text-foreground placeholder-muted-foreground',
                                  'transition-smooth',
                                  'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
                                  'resize-none'
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 rounded-b-lg border-t border-border bg-accent p-4">
                    <button 
                        onClick={onEditFullForm}
                        className={cn(
                          'rounded-md bg-background px-4 py-2 text-sm font-medium',
                          'text-foreground border border-input',
                          'transition-smooth hover:bg-accent/50'
                        )}
                    >
                        Edit Full Form
                    </button>
                    <button 
                        onClick={handleSave}
                        className={cn(
                          'rounded-md bg-primary px-4 py-2 text-sm font-semibold',
                          'text-primary-foreground',
                          'transition-smooth hover:opacity-90'
                        )}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewCustomerModal;
