import React, { useState } from 'react';
import {
    Plus,
    Trash2,
    Download,
    Send,
    User,
    Calendar,
    CreditCard,
    FileText
} from 'lucide-react';
import './Invoices.css';

const Invoices = () => {
    const [invoiceItems, setInvoiceItems] = useState([
        { id: 1, description: 'Premium Membership', qty: 1, price: 250 },
        { id: 2, description: 'Personal Training Session', qty: 2, price: 50 },
    ]);

    const [member, setMember] = useState('Alex Johnson');
    const [date, setDate] = useState('2026-06-15');
    const [dueDate, setDueDate] = useState('2026-06-25');

    const subtotal = invoiceItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const addItem = () => {
        setInvoiceItems([...invoiceItems, { id: Date.now(), description: '', qty: 1, price: 0 }]);
    };

    const removeItem = (id) => {
        setInvoiceItems(invoiceItems.filter(item => item.id !== id));
    };

    const updateItem = (id, field, value) => {
        setInvoiceItems(invoiceItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    return (
        <div className="invoices-page">
            <div className="page-header">
                <div>
                    <h1 className="heading-1">New Invoice</h1>
                    <p className="subtitle">Generate and send professional invoices to members.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">Save as Draft</button>
                    <button className="btn btn-primary">
                        <Send size={18} /> Send to Member
                    </button>
                </div>
            </div>

            <div className="invoice-container">
                {/* Editor Side */}
                <div className="invoice-editor">
                    <div className="glass-card p-6 mb-6">
                        <h3 className="heading-3 mb-4 flex items-center gap-2">
                            <User size={18} className="text-primary" /> Member Information
                        </h3>
                        <div className="input-group">
                            <label className="input-label">Select Member</label>
                            <select
                                className="input-field"
                                value={member}
                                onChange={(e) => setMember(e.target.value)}
                            >
                                <option>Alex Johnson</option>
                                <option>Sarah Wilson</option>
                                <option>Michael Chen</option>
                            </select>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="input-group">
                                <label className="input-label">Invoice Date</label>
                                <input
                                    type="date"
                                    className="input-field"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Due Date</label>
                                <input
                                    type="date"
                                    className="input-field"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="heading-3 flex items-center gap-2">
                                <CreditCard size={18} className="text-primary" /> Line Items
                            </h3>
                            <button className="btn btn-secondary py-1 text-sm" onClick={addItem}>
                                <Plus size={14} /> Add Item
                            </button>
                        </div>

                        <div className="items-list">
                            {invoiceItems.map((item) => (
                                <div key={item.id} className="item-row mb-4 p-4 border border-border-light rounded-lg relative">
                                    <button
                                        className="absolute top-2 right-2 text-danger hover:bg-danger/10 p-1 rounded-full transition-colors"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12 md:col-span-6">
                                            <label className="input-label">Description</label>
                                            <input
                                                type="text"
                                                className="input-field w-full"
                                                value={item.description}
                                                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                                placeholder="e.g. Monthly Membership"
                                            />
                                        </div>
                                        <div className="col-span-6 md:col-span-3">
                                            <label className="input-label">Qty</label>
                                            <input
                                                type="number"
                                                className="input-field w-full"
                                                value={item.qty}
                                                onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div className="col-span-6 md:col-span-3">
                                            <label className="input-label">Price</label>
                                            <input
                                                type="number"
                                                className="input-field w-full"
                                                value={item.price}
                                                onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="invoice-summary-calc mt-6 pt-6 border-t">
                            <div className="flex justify-between mb-2">
                                <span className="text-secondary">Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-secondary">Tax (5%)</span>
                                <span className="font-medium">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mt-4">
                                <span className="heading-3">Total Amount</span>
                                <span className="heading-3 text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Side */}
                <div className="invoice-preview-container">
                    <div className="preview-label mb-4 flex items-center gap-2">
                        <span className="pulse-dot"></span> Live Preview
                    </div>
                    <div className="invoice-preview glass-panel p-8">
                        <div className="preview-header flex justify-between mb-8">
                            <div className="company-info">
                                <div className="logo-placeholder mb-2"></div>
                                <h2 className="heading-2">FitFlow Gym</h2>
                                <p className="text-sm text-secondary">123 Fitness Ave, Wellness City</p>
                            </div>
                            <div className="invoice-meta text-right">
                                <h1 className="heading-1 text-primary">INVOICE</h1>
                                <p className="font-bold">#INV-2026-001</p>
                            </div>
                        </div>

                        <div className="preview-bill-to mb-8 grid grid-cols-2">
                            <div>
                                <p className="text-xs uppercase text-muted font-bold mb-1">Bill To</p>
                                <p className="font-bold">{member}</p>
                                <p className="text-sm text-secondary">Member ID: M-7890</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs uppercase text-muted font-bold mb-1">Due Date</p>
                                <p className="font-bold">{dueDate}</p>
                            </div>
                        </div>

                        <table className="preview-table w-full mb-8">
                            <thead>
                                <tr className="bg-bg-dark">
                                    <th className="p-2 text-left text-xs uppercase text-muted">Description</th>
                                    <th className="p-2 text-center text-xs uppercase text-muted">Qty</th>
                                    <th className="p-2 text-right text-xs uppercase text-muted">Price</th>
                                    <th className="p-2 text-right text-xs uppercase text-muted">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceItems.map((item) => (
                                    <tr key={item.id} className="border-b border-border-light">
                                        <td className="p-2 text-sm">{item.description || 'New Item'}</td>
                                        <td className="p-2 text-sm text-center">{item.qty}</td>
                                        <td className="p-2 text-sm text-right">${item.price.toFixed(2)}</td>
                                        <td className="p-2 text-sm text-right">${(item.qty * item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="preview-total flex justify-end">
                            <div className="w-1/2">
                                <div className="flex justify-between py-1">
                                    <span className="text-sm text-secondary">Subtotal</span>
                                    <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-sm text-secondary">Tax (5%)</span>
                                    <span className="text-sm font-medium">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-t mt-2">
                                    <span className="font-bold">Total Due</span>
                                    <span className="font-bold text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="preview-footer mt-12 pt-8 border-t text-center">
                            <p className="text-xs text-muted mb-2">Thank you for being a valued member of FitFlow!</p>
                            <div className="flex justify-center gap-4">
                                <FileText size={16} className="text-muted" />
                                <span className="text-xs text-muted">Invoice generated on {date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoices;
