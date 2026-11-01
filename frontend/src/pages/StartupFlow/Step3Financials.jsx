import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Info } from 'lucide-react';

const FIELD_CONFIGS = {
    saas: [
        { id: 'mrr', label: 'Monthly Recurring Revenue', type: 'currency', required: true, critical: true },
        { id: 'acv', label: 'Annual Contract Value', type: 'currency', required: true },
        { id: 'nrr', label: 'Net Retention Rate', type: 'percentage', required: true, critical: true },
        { id: 'cac', label: 'Customer Acquisition Cost', type: 'currency', required: true },
        { id: 'ltv', label: 'Customer Lifetime Value', type: 'currency', required: true },
        { id: 'ltv_cac', label: 'LTV/CAC Ratio', type: 'display', autoCalc: (data) => data.ltv && data.cac ? (data.ltv / data.cac).toFixed(2) : 'N/A', critical: true },
        { id: 'churn', label: 'Monthly Churn Rate', type: 'percentage', required: true },
        { id: 'payback', label: 'CAC Payback Period (months)', type: 'number', required: true },
    ],
    fintech: [
        { id: 'tx_vol', label: 'Monthly Transaction Volume', type: 'currency', required: true },
        { id: 'active_users', label: 'Active Users', type: 'number', required: true },
        { id: 'avg_tx_val', label: 'Average Transaction Value', type: 'currency', required: true },
        { id: 'uac', label: 'User Acquisition Cost', type: 'currency', required: true },
        { id: 'user_churn', label: 'User Churn Rate', type: 'percentage', required: true },
        { id: 'reg_status', label: 'Regulatory Status', type: 'select', options: ['RBI Approved', 'NBFC Licensed', 'IOTA Registered', 'Pending', 'Unregulated'], required: true, critical: true },
        { id: 'reserve_ratio', label: 'Reserve Ratio', type: 'percentage', required: true },
        { id: 'mom_user_growth', label: 'MoM User Growth', type: 'percentage', required: true },
    ],
    d2c: [
        { id: 'revenue', label: 'Monthly Revenue/GMV', type: 'currency', required: true },
        { id: 'aov', label: 'Average Order Value', type: 'currency', required: true },
        { id: 'cac', label: 'Customer Acquisition Cost', type: 'currency', required: true },
        { id: 'repeat_rate', label: 'Repeat Purchase Rate', type: 'percentage', required: true, critical: true },
        { id: 'cltv', label: 'Customer Lifetime Value', type: 'currency', required: true },
        { id: 'dio', label: 'Days of Inventory Outstanding', type: 'number', required: true },
        { id: 'refund_rate', label: 'Return/Refund Rate', type: 'percentage', required: true },
        { id: 'gross_margin', label: 'Gross Margin', type: 'percentage', required: true },
        { id: 'shipping_cost', label: 'Shipping Cost (% of rev)', type: 'percentage', required: true },
        { id: 'mom_ rev_growth', label: 'MoM Revenue Growth', type: 'percentage', required: true },
    ],
    marketplace: [
        { id: 'gmv', label: 'Gross Merchandise Value (GMV)', type: 'currency', required: true },
        { id: 'active_sellers', label: 'Active Sellers', type: 'number', required: true },
        { id: 'active_buyers', label: 'Active Buyers', type: 'number', required: true },
        { id: 'avg_tx_size', label: 'Average Transaction Size', type: 'currency', required: true },
        { id: 'take_rate', label: 'Take Rate (% of GMV)', type: 'percentage', required: true },
        { id: 'seller_churn', label: 'Seller Churn Rate', type: 'percentage', required: true, critical: true },
        { id: 'buyer_churn', label: 'Buyer Churn Rate', type: 'percentage', required: true, critical: true },
        { id: 'gmv_growth', label: 'GMV Growth Rate (MoM)', type: 'percentage', required: true },
        { id: 'seller_acq_cost', label: 'Seller Acquisition Cost', type: 'currency', required: true },
        { id: 'dispute_rate', label: 'Dispute Rate', type: 'percentage', required: true },
    ],
    edtech: [
        { id: 'student_count', label: 'Student Count', type: 'number', required: true },
        { id: 'monthly_rev', label: 'Monthly Revenue', type: 'currency', required: true },
        { id: 'arpu', label: 'Average Revenue Per Student', type: 'currency', required: true },
        { id: 'completion_rate', label: 'Student Completion Rate', type: 'percentage', required: true, critical: true },
        { id: 'retention_rate', label: 'Student Retention Rate', type: 'percentage', required: true },
        { id: 'instructor_count', label: 'Instructor Count', type: 'number', required: true },
        { id: 'uac', label: 'User Acquisition Cost', type: 'currency', required: true },
        { id: 'mom_growth', label: 'MoM Growth', type: 'percentage', required: true },
    ],
    healthtech: [
        { id: 'active_patients', label: 'Active Users/Patients', type: 'number', required: true },
        { id: 'monthly_rev', label: 'Monthly Revenue', type: 'currency', required: true },
        { id: 'provider_count', label: 'Doctor/Provider Count', type: 'number', required: true },
        { id: 'uac', label: 'User Acquisition Cost', type: 'currency', required: true },
        { id: 'completion_rate', label: 'Consultation Completion Rate', type: 'percentage', required: true },
        { id: 'reg_compliance', label: 'Regulatory Compliance', type: 'select', options: ['Fully Compliant', 'Pending', 'Not Started'], required: true, critical: true },
        { id: 'data_security', label: 'Data Security Cert', type: 'select', options: ['ISO 27001', 'SOC 2', 'Other', 'None'], required: true, critical: true },
        { id: 'insurance_partner', label: 'Insurance Partnership', type: 'select', options: ['Yes', 'In talks', 'No'], required: true },
        { id: 'mom_growth', label: 'MoM Growth', type: 'percentage', required: true },
    ]
};

const Step3Financials = ({ data, updateData, onNext }) => {
    const [errors, setErrors] = useState({});
    const industryFields = FIELD_CONFIGS[data.industry] || FIELD_CONFIGS.saas; // Fallback to SaaS if not found

    const handleChange = (id, value) => {
        // Only allow positive numbers for numeric/currency/percentage fields if value is present
        if (value && ['number', 'currency', 'percentage'].includes(industryFields.find(f => f.id === id)?.type)) {
            if (isNaN(value) || Number(value) < 0) return;
        }
        updateData({ [id]: value });
    };

    const validate = () => {
        const newErrors = {};
        industryFields.forEach(field => {
            if (field.required && !data[field.id] && field.type !== 'display') {
                newErrors[field.id] = 'Required';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            onNext();
        }
    };

    return (
        <div className="max-w-3xl mx-auto animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-2">Financial Metrics</h2>
            <p className="text-slate-400 mb-8">Please provide your key metrics for {data.industry?.toUpperCase()}.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {industryFields.map((field) => (
                    <div key={field.id} className="relative group">
                        <label className="flex items-center text-sm font-medium text-slate-400 mb-2">
                            {field.label}
                            {field.critical && (
                                <span className="ml-2 px-1.5 py-0.5 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold rounded uppercase">
                                    Critical
                                </span>
                            )}
                            {errors[field.id] && <span className="text-red-400 ml-auto text-xs">{errors[field.id]}</span>}
                        </label>

                        <div className="relative">
                            {/* Input Icons */}
                            {field.type === 'currency' && (
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-sans">₹</span>
                            )}

                            {field.type === 'select' ? (
                                <select
                                    value={data[field.id] || ''}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    className={`
                    w-full bg-slate-800 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500 appearance-none
                    ${errors[field.id] ? 'border-red-500/50' : 'border-slate-700 focus:border-primary-500'}
                    ${field.critical ? 'bg-yellow-500/5 border-yellow-500/20' : ''}
                  `}
                                >
                                    <option value="">Select...</option>
                                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            ) : field.type === 'display' ? (
                                <div className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-300 font-mono">
                                    {field.autoCalc ? field.autoCalc(data) : 'N/A'}
                                </div>
                            ) : (
                                <input
                                    type={field.type === 'date' ? 'date' : 'number'} // Default to number for most metrics
                                    value={data[field.id] || ''}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    className={`
                    w-full bg-slate-800 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500
                    ${errors[field.id] ? 'border-red-500/50' : 'border-slate-700 focus:border-primary-500'}
                    ${field.critical ? 'bg-yellow-500/5 border-yellow-500/20' : ''}
                    ${field.type === 'currency' ? 'pl-8' : ''}
                  `}
                                    placeholder="0"
                                />
                            )}

                            {field.type === 'percentage' && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                            )}
                        </div>

                        {/* Tooltip on hover could go here */}
                    </div>
                ))}
            </div>

            <div className="pt-8 flex justify-end">
                <button
                    onClick={handleNext}
                    className="bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3 px-8 rounded-xl transition-all flex items-center shadow-lg shadow-primary-900/20"
                >
                    Continue to Growth Metrics <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default Step3Financials;
