import React, { useState } from 'react';
import { CreditCard, Landmark, DollarSign, ShieldCheck, Eye, EyeOff, Save, RefreshCw } from 'lucide-react';
import './Payments.css';

const Payments = () => {
    const [showKeys, setShowKeys] = useState({ stripe: false, razorpay: false });
    const [isSaving, setIsSaving] = useState(false);

    const toggleKeyVisibility = (key) => {
        setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Payment settings updated successfully.');
        }, 1000);
    };

    return (
        <div className=" payments-settings">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="heading-1">Payments & Billing</h1>
                    <p className="subtitle">Configure your payment gateways, currency, and billing preferences.</p>
                </div>
                <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                    <Save size={18} /> {isSaving ? 'Saving...' : 'Save Configuration'}
                </button>
            </header>

            <div className="settings-section-grid">
                {/* Gateway Configuration */}
                <div className="glass-panel p-6 section-card">
                    <div className="section-header mb-6">
                        <div className="section-icon bg-blue-soft"><Landmark size={20} className="text-accent" /></div>
                        <div>
                            <h3 className="heading-3">Payment Gateways</h3>
                            <p className="text-sm text-muted">Manage your API keys for online transactions.</p>
                        </div>
                    </div>

                    <div className="gateway-config mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <img src="https://img.icons8.com/color/48/stripe.png" alt="Stripe" width="24" />
                            <span className="font-semibold">Stripe (Primary)</span>
                            <span className="badge badge-success ml-auto">Live</span>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Publishable Key</label>
                            <input type="text" className="input-field" value="pk_live_************************" readOnly />
                        </div>
                        <div className="input-group mt-3">
                            <label className="input-label">Secret Key</label>
                            <div className="password-field-wrapper">
                                <input
                                    type={showKeys.stripe ? "text" : "password"}
                                    className="input-field"
                                    value="sk_live_51Pjk**************"
                                    readOnly
                                />
                                <button className="password-toggle" onClick={() => toggleKeyVisibility('stripe')}>
                                    {showKeys.stripe ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="gateway-config pt-6 border-t border-border-light">
                        <div className="flex items-center gap-2 mb-4">
                            <img src="https://img.icons8.com/color/48/razorpay.png" alt="Razorpay" width="24" />
                            <span className="font-semibold">Razorpay</span>
                            <span className="badge badge-warning ml-auto">Test Mode</span>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Key ID</label>
                            <input type="text" className="input-field" value="rzp_test_123456789" readOnly />
                        </div>
                        <div className="input-group mt-3">
                            <label className="input-label">Key Secret</label>
                            <div className="password-field-wrapper">
                                <input
                                    type={showKeys.razorpay ? "text" : "password"}
                                    className="input-field"
                                    value="*********************"
                                    readOnly
                                />
                                <button className="password-toggle" onClick={() => toggleKeyVisibility('razorpay')}>
                                    {showKeys.razorpay ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Billing & Currency */}
                <div className="flex flex-col gap-6">
                    <div className="glass-panel p-6 section-card">
                        <div className="section-header mb-6">
                            <div className="section-icon bg-green-soft"><DollarSign size={20} className="text-success" /></div>
                            <div>
                                <h3 className="heading-3">Billing & Tax</h3>
                                <p className="text-sm text-muted">Set your currency and regional tax rules.</p>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Base Currency</label>
                            <select className="input-field">
                                <option value="USD">USD ($) - US Dollar</option>
                                <option value="INR">INR (₹) - Indian Rupee</option>
                                <option value="EUR">EUR (€) - Euro</option>
                                <option value="GBP">GBP (£) - British Pound</option>
                            </select>
                        </div>

                        <div className="input-group mt-4">
                            <label className="input-label">Tax Rate (GST/VAT %)</label>
                            <input type="number" className="input-field" defaultValue="18" />
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CreditCard size={20} className="text-muted" />
                                <div>
                                    <p className="text-sm font-semibold">Auto-Recurring Billing</p>
                                    <p className="text-xs text-muted">Automatically charge following month</p>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>

                    <div className="glass-panel p-6 section-card bg-primary text-white border-none">
                        <div className="flex items-start gap-4">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">PCI-DSS Compliant</h3>
                                <p className="text-white/80 text-sm mt-1">
                                    Your payment processing is handled via industry-standard encryption. GymSync never stores raw card data on its own servers.
                                </p>
                                <button className="mt-4 text-xs font-bold flex items-center gap-1 opacity-80 hover:opacity-100">
                                    LEARN MORE <RefreshCw size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payments;
