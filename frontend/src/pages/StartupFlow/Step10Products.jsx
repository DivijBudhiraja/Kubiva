import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

const Step10Products = ({ products, onSelectProduct }) => {
    return (
        <div className="max-w-6xl mx-auto animate-fadeIn pb-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-3">Recommended Financial Products</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Based on your risk profile and cash flow, these are the best financing options structured for your growth.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-dark-card border border-slate-700 hover:border-primary-500/50 rounded-2xl p-6 flex flex-col relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-slate-900/50"
                    >
                        {/* Header */}
                        <div className="mb-4">
                            <span className="text-xs font-bold text-primary-400 tracking-wider uppercase mb-1 block">
                                {product.type} STRUCTURE
                            </span>
                            <h3 className="text-xl font-bold text-white leading-tight">{product.name}</h3>
                        </div>

                        {/* Amount */}
                        <div className="mb-6 pb-6 border-b border-slate-800">
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold text-white">{product.amount}</span>
                            </div>
                            <span className="text-sm text-slate-400">Approved Limit</span>
                        </div>

                        {/* Details */}
                        <div className="space-y-3 mb-8 flex-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Interest / Fee</span>
                                <span className="text-white font-medium">{product.rate}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Repayment</span>
                                <span className="text-white font-medium text-right">{product.paymentType}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Tenure</span>
                                <span className="text-white font-medium">{product.tenure}</span>
                            </div>

                            <div className="pt-4 space-y-2">
                                {product.features && product.features.slice(0, 2).map((feat, i) => (
                                    <div key={i} className="flex items-center text-xs text-slate-300">
                                        <Check className="h-3 w-3 text-green-400 mr-2" />
                                        {feat}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => onSelectProduct(product)}
                            className="w-full bg-slate-800 hover:bg-primary-600 border border-slate-700 hover:border-primary-500 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center group-hover:shadow-lg shadow-primary-900/20"
                        >
                            Select & Customize <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Step10Products;
