import React, { useState } from 'react';
import {
    Zap, TrendingUp, BarChart3, Clock, Package, Rocket,
    ArrowRight, Check, Info, MousePointerClick
} from 'lucide-react';

const LoanCard = ({ product, onSelect }) => {
    return (
        <div className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-500/50 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
            {/* Top Gradient Accent */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${product.gradient}`} />

            <div className="flex justify-between items-start mb-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${product.iconBg} ${product.iconColor}`}>
                    {product.icon}
                </div>
                {product.badge && (
                    <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-wide">
                        {product.badge}
                    </span>
                )}
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{product.title}</h3>
            <p className="text-xs text-slate-500 mb-6 flex-grow">{product.description}</p>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                    <span className="text-slate-400 font-medium text-xs">AMOUNT</span>
                    <span className="text-slate-900 font-bold">{product.amount}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                    <span className="text-slate-400 font-medium text-xs">RATE/COST</span>
                    <span className={`font-bold ${product.rateColor || 'text-slate-900'}`}>{product.rate}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-medium text-xs">FEATURE</span>
                    <span className="text-teal-600 font-semibold text-xs">{product.feature}</span>
                </div>
            </div>

            <button
                onClick={() => onSelect(product)}
                className="w-full mt-auto bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold py-3 rounded-xl border border-slate-200 flex items-center justify-center transition-colors group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900"
            >
                Customize & Select
            </button>
        </div>
    );
};

const Step5LoanOptions = ({ onNext }) => {

    const products = [
        {
            id: 'rbf',
            title: 'Revenue Based Financing',
            description: 'Non-dilutive capital repaid as a % of monthly revenue. Flexible based on your sales.',
            amount: '$50k - $500k',
            rate: '4-8% Rev Share',
            feature: 'Variable Repayment',
            icon: <Zap className="h-6 w-6" />,
            iconBg: 'bg-teal-50',
            iconColor: 'text-teal-600',
            gradient: 'from-teal-400 to-emerald-500',
            badge: 'MOST POPULAR'
        },
        {
            id: 'growth',
            title: 'Growth Trigger Loan',
            description: 'Interest rate automatically drops as you hit pre-defined growth milestones.',
            amount: '$100k - $2M',
            rate: '14% ➔ 10%',
            rateColor: 'text-purple-600',
            feature: 'Performance Discounts',
            icon: <TrendingUp className="h-6 w-6" />,
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600',
            gradient: 'from-purple-400 to-indigo-500',
            badge: 'SMART RATE'
        },
        {
            id: 'marketing',
            title: 'Marketing ROI Loan',
            description: 'Direct financing for ad spend (FB/Google Ads). We pay the platforms directly.',
            amount: '100% of Ad Spend',
            rate: '1.5% Monthly',
            feature: 'Proof-of-Spend',
            icon: <BarChart3 className="h-6 w-6" />,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            gradient: 'from-blue-400 to-cyan-500'
        },
        {
            id: 'saas',
            title: 'SaaS Runway Extender',
            description: 'Interest-only payments for 12 months to extend runway before your next VC round.',
            amount: '3-6 Months ARR',
            rate: '12% APR',
            feature: 'Interest-Only Period',
            icon: <Clock className="h-6 w-6" />,
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-600',
            gradient: 'from-orange-400 to-red-500',
            badge: 'FOR SERIES A'
        },
        {
            id: 'inventory',
            title: 'Smart Inventory Lien',
            description: 'Revolving credit line secured against liquid inventory. Ideal for D2C/Retail.',
            amount: '70% Inventory Value',
            rate: '10-14% APR',
            feature: 'Auto-Scaling Limit',
            icon: <Package className="h-6 w-6" />,
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-600',
            gradient: 'from-amber-400 to-yellow-500'
        },
        {
            id: 'venture',
            title: 'Programmatic Venture Debt',
            description: 'Minimal warrant debt for high-growth startups backed by strong VC term sheets.',
            amount: '$1M - $5M',
            rate: '10% + 1% Warrants',
            feature: 'Non-Dilutive',
            icon: <Rocket className="h-6 w-6" />,
            iconBg: 'bg-pink-50',
            iconColor: 'text-pink-600',
            gradient: 'from-pink-400 to-rose-500'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold tracking-wide mb-4">
                    <Check className="h-3 w-3 mr-1.5" /> PASSPORT ANALYZED
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                    6 Ways to Fuel Your Growth
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                    AI recommendation: <span className="text-teal-600 font-bold">Revenue Based Financing</span> matches your cash flow consistency best.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                    <LoanCard key={p.id} product={p} onSelect={onNext} />
                ))}
            </div>

            <div className="mt-12 text-center">
                <p className="text-slate-400 text-sm flex items-center justify-center">
                    <Info className="h-4 w-4 mr-2" />
                    All offers are preliminary and subject to final smart contract verification.
                </p>
            </div>
        </div>
    );
};

export default Step5LoanOptions;
