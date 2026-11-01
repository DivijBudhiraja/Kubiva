import React, { useState } from 'react';
import { CheckCircle, TrendingUp, Shield, Zap, ArrowRight, PieChart, BarChart, DollarSign, Send } from 'lucide-react';

const Step5AIResults = ({ onNext }) => {
    const [selectedProduct, setSelectedProduct] = useState(0);

    const products = [
        {
            id: 0,
            title: "Revenue Based Financing",
            subtitle: "Non-dilutive Growth Capital",
            amount: "$100,000",
            term: "Flexible",
            cost: "6% Flat Fee",
            repayment: "4% of Monthly Revenue",
            badge: "AI RECOMMENDED",
            badgeColor: "bg-teal-500",
            icon: TrendingUp,
            styles: {
                border: "border-teal-500",
                bg: "bg-teal-50",
                text: "text-teal-600",
                textDim: "text-teal-500",
                btn: "bg-teal-600",
                ring: "ring-teal-500/10"
            },
            features: ["No equity dilution", "Payments scale with revenue", "No personal guarantee"]
        },
        {
            id: 1,
            title: "Ad-Spend Credit Line",
            subtitle: "ROI-Focused Marketing Capital",
            amount: "$50,000",
            term: "Revolving",
            cost: "1.2% / month",
            repayment: "Weekly from Ad Revenue",
            badge: "HIGH ROI DETECTED",
            badgeColor: "bg-purple-500",
            icon: Send,
            styles: {
                border: "border-purple-500",
                bg: "bg-purple-50",
                text: "text-purple-600",
                textDim: "text-purple-500",
                btn: "bg-purple-600",
                ring: "ring-purple-500/10"
            },
            features: ["Direct pay to Meta/Google", "Increases with ROAS", "Daily spend tracking"]
        },
        {
            id: 2,
            title: "SaaS MRR Trade",
            subtitle: "Trade Subscriptions for Cash",
            amount: "$75,000",
            term: "12 Months",
            cost: "8% Discount",
            repayment: "Fixed Monthly",
            badge: "FOR SAAS SCALING",
            badgeColor: "bg-indigo-500",
            icon: DollarSign,
            styles: {
                border: "border-indigo-500",
                bg: "bg-indigo-50",
                text: "text-indigo-600",
                textDim: "text-indigo-500",
                btn: "bg-indigo-600",
                ring: "ring-indigo-500/10"
            },
            features: ["Upfront cash for ARR", "No debt on balance sheet", "Instant liquidity"]
        }
    ];

    const current = products[selectedProduct];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">AI Underwriting Complete</h2>
                <p className="text-slate-500">We found 3 unique financial products tailored to your business model.</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">

                {/* Left: AI Insight Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-teal-500 rounded-full blur-[50px] opacity-40"></div>

                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg">Risk Score</h3>
                            <div className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-mono border border-teal-500/30">
                                AI V2.4
                            </div>
                        </div>

                        <div className="flex items-end mb-2">
                            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                                85
                            </span>
                            <span className="text-slate-400 text-lg mb-1 ml-2">/ 100</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2 mb-6">
                            <div className="bg-gradient-to-r from-teal-400 to-emerald-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">KEY INSIGHTS</h4>
                            {[
                                "Strong recurring revenue",
                                "High ROAS on Meta Ads",
                                "Low churn (< 2%)"
                            ].map((insight, i) => (
                                <div key={i} className="flex items-start text-sm text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 mt-0.5 shrink-0" />
                                    {insight}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                        <div className="flex items-center mb-2 text-indigo-900 font-bold">
                            <BarChart className="h-5 w-5 mr-2 text-indigo-600" /> Capital Strategy
                        </div>
                        <p className="text-sm text-indigo-700 leading-relaxed">
                            AI suggests splitting capital between <strong>Product Development</strong> (RBF) and <strong>Marketing</strong> (Ad-Spend Line) for optimal compounding growth.
                        </p>
                    </div>
                </div>

                {/* Right: Product Selection */}
                <div className="lg:col-span-3">
                    <div className="grid md:grid-cols-3 gap-6">
                        {products.map((product, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedProduct(idx)}
                                className={`rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden relative group ${selectedProduct === idx
                                        ? `${product.styles.border} bg-white shadow-xl scale-[1.02] ring-4 ${product.styles.ring}`
                                        : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-lg'
                                    }`}
                            >
                                {product.badge && (
                                    <div className={`absolute top-0 right-0 ${product.badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl`}>
                                        {product.badge}
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className={`h-12 w-12 rounded-xl ${product.styles.bg} ${product.styles.text} flex items-center justify-center mb-4`}>
                                        <product.icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{product.title}</h3>
                                    <p className="text-xs text-slate-500 mb-6 h-8">{product.subtitle}</p>

                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Amount</div>
                                            <div className="text-2xl font-bold text-slate-900">{product.amount}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <div className="text-xs text-slate-400">Cost</div>
                                                <div className="text-sm font-semibold text-slate-700">{product.cost}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400">Repayment</div>
                                                <div className="text-sm font-semibold text-slate-700">{product.repayment}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mb-6">
                                        {product.features.map((feat, i) => (
                                            <li key={i} className="text-xs text-slate-600 flex items-center">
                                                <CheckCircle className={`h-3 w-3 mr-2 ${product.styles.textDim}`} />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${selectedProduct === idx
                                            ? `${product.styles.btn} text-white shadow-lg`
                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                        }`}>
                                        {selectedProduct === idx ? 'Selected' : 'Select Offer'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end items-center gap-4 animate-slideUp">
                        <div className="text-right">
                            <div className="text-sm text-slate-500">Selected Product</div>
                            <div className="font-bold text-slate-900">{current.title}</div>
                        </div>
                        <button
                            onClick={onNext}
                            className={`bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1 flex items-center`}
                        >
                            Finalize Application <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step5AIResults;
