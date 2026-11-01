import React, { useState } from 'react';
import { ArrowRight, TrendingDown, TrendingUp, Calendar } from 'lucide-react';

const Step11Comparison = ({ product, onProceed }) => {
    const [revenueScenario, setRevenueScenario] = useState(0); // 0=Base, 1=+20%, -1=-15%

    if (!product) return null;

    // Simulation Logic
    const getScenarioLabel = () => {
        if (revenueScenario === 1) return "High Revenue (+20%)";
        if (revenueScenario === -1) return "Low Revenue (-15%)";
        return "Expected Revenue";
    };

    const getMonthlyPayment = () => {
        // Simplified mock logic for prototype
        let base = typeof product.amount === 'string' ? 50000 : (product.amountValue * 0.05); // rough estimate
        if (product.type === 'Fixed') return base;
        if (product.type === 'Variable') {
            if (revenueScenario === 1) return base * 1.2;
            if (revenueScenario === -1) return base * 0.85;
        }
        return base;
    };

    const payment = getMonthlyPayment();

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn pb-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Customize Your Plan</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* Product Summary */}
                <div className="md:col-span-1">
                    <div className="bg-dark-card border border-primary-500/50 rounded-2xl p-6 shadow-lg shadow-primary-900/10">
                        <div className="text-xs font-bold text-primary-400 uppercase mb-2 ml-1">SELECTED PRODUCT</div>
                        <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="block text-slate-500 text-sm">Loan Amount</span>
                                <span className="block text-white font-bold text-xl">{product.amount}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-sm">Interest / Rate</span>
                                <span className="block text-white font-semibold">{product.rate}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-sm">Tenure</span>
                                <span className="block text-white font-semibold">{product.tenure}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simulation */}
                <div className="md:col-span-2">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
                        <h4 className="text-white font-bold mb-6 flex items-center">
                            <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
                            "What If" Simulator
                        </h4>

                        <div className="mb-8">
                            <label className="text-slate-400 text-sm mb-4 block">Projected Revenue Scenario</label>
                            <div className="flex bg-slate-900 p-1 rounded-xl">
                                <button
                                    onClick={() => setRevenueScenario(-1)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${revenueScenario === -1 ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-white'}`}
                                >
                                    Low (-15%)
                                </button>
                                <button
                                    onClick={() => setRevenueScenario(0)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${revenueScenario === 0 ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                                >
                                    Expected
                                </button>
                                <button
                                    onClick={() => setRevenueScenario(1)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${revenueScenario === 1 ? 'bg-green-500/20 text-green-400' : 'text-slate-400 hover:text-white'}`}
                                >
                                    High (+20%)
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 transition-all duration-500">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-400">Estimated Monthly Payment</span>
                                <span className={`text-xl font-bold ${product.type !== 'Fixed' && revenueScenario !== 0 ? 'text-primary-400' : 'text-white'
                                    }`}>
                                    ₹{Math.round(payment).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">
                                {product.type === 'Fixed'
                                    ? "Your payment remains fixed regardless of revenue functionality."
                                    : "With RBF, your payment adjusts with your revenue."}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={onProceed}
                            className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center shadow-lg shadow-primary-900/20 hover:scale-105"
                        >
                            Proceed to Finalization <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step11Comparison;
