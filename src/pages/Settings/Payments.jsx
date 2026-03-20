import React, { useState } from 'react';
import { CreditCard, Landmark, DollarSign, ShieldCheck, Save, RefreshCw, Building, Briefcase } from 'lucide-react';
import './Payments.css';

const Payments = () => {
    const [isSaving, setIsSaving] = useState(false);

    // Comprehensive state for all basic details required for payments and billing setup
    const [formData, setFormData] = useState({
        businessName: 'IronForge Gym',
        supportEmail: 'billing@ironforge.com',
        taxId: '',
        bankName: '',
        accountHolder: '',
        accountNumber: '',
        routingNumber: '',
        stripeEnabled: true,
        razorpayEnabled: false,
        baseCurrency: 'USD',
        taxRate: 18,
        autoRecurring: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleToggleGateway = (gateway) => {
        setFormData(prev => ({
            ...prev,
            [gateway]: !prev[gateway]
        }));
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulating the necessary backend processing payload
        console.log('--- Processing Payment Settings Backend Payload ---');
        console.log(JSON.stringify(formData, null, 2));

        setTimeout(() => {
            setIsSaving(false);
            alert('Payment & Billing preferences have been successfully updated.');
        }, 1200);
    };

    return (
        <div className="payments-settings">
            <header className="payments-header">
                <div>
                    <h1 className="heading-1">Payments & Billing</h1>
                    <p className="subtitle">Configure your payout accounts, payment methods, and billing preferences.</p>
                </div>
                <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                    <Save size={18} /> {isSaving ? 'Saving...' : 'Save Configuration'}
                </button>
            </header>

            <div className="settings-section-grid">

                {/* Column 1: Business Profile & Payout Account */}
                <div className="payments-col">
                    {/* Business Profile */}
                    <div className="glass-panel section-card payments-card">
                        <div className="section-header payments-mb-6">
                            <div className="section-icon payments-theme-icon"><Building size={20} /></div>
                            <div>
                                <h3 className="heading-3">Business Profile</h3>
                                <p className="payments-text-sm payments-text-muted">Legal entity details for billing and invoices.</p>
                            </div>
                        </div>

                        <div className="input-group payments-form-group">
                            <label className="input-label">Legal Business Name</label>
                            <input type="text" className="input-field" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="e.g. IronForge Fitness LLC" />
                        </div>
                        <div className="input-group payments-form-group">
                            <label className="input-label">Support / Billing Email</label>
                            <input type="email" className="input-field" name="supportEmail" value={formData.supportEmail} onChange={handleChange} placeholder="billing@yourgym.com" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Tax ID / EIN / GSTIN (Optional)</label>
                            <input type="text" className="input-field" name="taxId" value={formData.taxId} onChange={handleChange} placeholder="Enter your business tax ID" />
                        </div>
                    </div>

                    {/* Payout Account Details */}
                    <div className="glass-panel section-card payments-card">
                        <div className="section-header payments-mb-6">
                            <div className="section-icon payments-theme-icon"><Briefcase size={20} /></div>
                            <div>
                                <h3 className="heading-3">Payout Account</h3>
                                <p className="payments-text-sm payments-text-muted">Where your membership revenue will be deposited.</p>
                            </div>
                        </div>

                        <div className="input-group payments-form-group">
                            <label className="input-label">Bank Name</label>
                            <input type="text" className="input-field" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g. Chase Bank" />
                        </div>
                        <div className="input-group payments-form-group">
                            <label className="input-label">Account Holder Name</label>
                            <input type="text" className="input-field" name="accountHolder" value={formData.accountHolder} onChange={handleChange} placeholder="Name exactly as it appears on account" />
                        </div>
                        <div className="payments-form-row">
                            <div className="input-group payments-form-col">
                                <label className="input-label">Account Number</label>
                                <input type="password" className="input-field" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="••••••••" />
                            </div>
                            <div className="input-group payments-form-col">
                                <label className="input-label">Routing / IFSC Code</label>
                                <input type="text" className="input-field" name="routingNumber" value={formData.routingNumber} onChange={handleChange} placeholder="Routing number" />
                            </div>
                        </div>
                        <p className="payments-text-xs payments-text-muted payments-mt-4">Transfers take 2-3 business days to arrive in your account.</p>
                    </div>
                </div>

                {/* Column 2: Providers, Currency & Security */}
                <div className="payments-col">
                    {/* Payment Gateways / Providers */}
                    <div className="glass-panel section-card payments-card">
                        <div className="section-header payments-mb-6">
                            <div className="section-icon payments-theme-icon"><Landmark size={20} /></div>
                            <div>
                                <h3 className="heading-3">Payment Methods</h3>
                                <p className="payments-text-sm payments-text-muted">Select how members can pay you online.</p>
                            </div>
                        </div>

                        <div className="payments-gateway-box payments-mb-4">
                            <div className="payments-gateway-info">
                                <img src="https://img.icons8.com/color/48/stripe.png" alt="Stripe" width="28" />
                                <div>
                                    <span className="payments-gateway-title">Credit / Debit Cards</span>
                                    <span className="payments-gateway-subtitle">Powered by Stripe</span>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input type="checkbox" checked={formData.stripeEnabled} onChange={() => handleToggleGateway('stripeEnabled')} />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="payments-gateway-box">
                            <div className="payments-gateway-info">
                                <img src="https://img.icons8.com/color/48/razorpay.png" alt="Razorpay" width="28" />
                                <div>
                                    <span className="payments-gateway-title">UPI & Local Wallets</span>
                                    <span className="payments-gateway-subtitle">Powered by Razorpay</span>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input type="checkbox" checked={formData.razorpayEnabled} onChange={() => handleToggleGateway('razorpayEnabled')} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <p className="payments-text-xs payments-text-muted payments-mt-4">By enabling these gateways, processing fees will be automatically deducted before payouts.</p>
                    </div>

                    {/* Billing & Currency */}
                    <div className="glass-panel section-card payments-card">
                        <div className="section-header payments-mb-6">
                            <div className="section-icon payments-theme-icon"><DollarSign size={20} /></div>
                            <div>
                                <h3 className="heading-3">Billing Options</h3>
                                <p className="payments-text-sm payments-text-muted">Set your currency and regional tax rules.</p>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Base Currency</label>
                            <select className="input-field payments-bg-white" name="baseCurrency" value={formData.baseCurrency} onChange={handleChange}>
                                <option value="USD">USD ($) - US Dollar</option>
                                <option value="INR">INR (₹) - Indian Rupee</option>
                                <option value="EUR">EUR (€) - Euro</option>
                                <option value="GBP">GBP (£) - British Pound</option>
                            </select>
                        </div>

                        <div className="input-group payments-mt-4">
                            <label className="input-label">Tax Rate (GST/VAT %)</label>
                            <input type="number" className="input-field" name="taxRate" value={formData.taxRate} onChange={handleChange} />
                        </div>

                        <div className="payments-auto-billing-box payments-mt-6">
                            <div className="payments-gateway-info">
                                <CreditCard size={20} className="payments-text-muted" />
                                <div>
                                    <p className="payments-auto-billing-title">Auto-Recurring Billing</p>
                                    <p className="payments-gateway-subtitle">Setup automatic collections</p>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input type="checkbox" name="autoRecurring" checked={formData.autoRecurring} onChange={handleChange} />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Compliance Banner */}
                    <div className="glass-panel section-card payments-card payments-compliance-banner">
                        <div className="payments-banner-layout">
                            <div className="payments-banner-icon">
                                <ShieldCheck size={24} />
                            </div>
                            <div className="payments-banner-content">
                                <h3 className="payments-banner-title">Secure Provider Integration</h3>
                                <p className="payments-banner-text">
                                    Your merchant account setup handles payment info compliantly. We do not store any direct credit card data on our servers.
                                </p>
                                <button className="payments-banner-btn">
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
