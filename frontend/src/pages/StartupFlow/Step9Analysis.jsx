import React from 'react';
import { AlertTriangle, TrendingUp, ShieldCheck, DollarSign, Activity } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const Step9Analysis = ({ results, onNext }) => {
    if (!results) return <div className="text-white">Loading analysis...</div>;

    const { riskAssessment, debtCapacity, benchmarks } = results;

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn pb-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Analysis Complete</h2>
                <p className="text-slate-400">Here is your financial health report and risk assessment.</p>
            </div>

            {/* Section A: Risk Assessment */}
            <div className="bg-dark-card border border-slate-700/50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                        <ShieldCheck className="mr-2 h-6 w-6 text-primary-400" />
                        Risk Assessment
                    </h3>
                    <span className={`px-4 py-1 rounded-full text-sm font-bold ${riskAssessment.score > 75 ? 'bg-green-500/20 text-green-400' :
                        riskAssessment.score > 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                        {riskAssessment.category} RISK
                    </span>
                </div>

                <div className="md:flex gap-8 items-center">
                    <div className="flex-1">
                        <div className="mb-4">
                            <span className="text-4xl font-bold text-white">{riskAssessment.score}</span>
                            <span className="text-slate-500 text-lg">/100</span>
                        </div>
                        <div className="space-y-2">
                            {riskAssessment.factors.map((factor, idx) => (
                                <div key={idx} className="flex items-start text-sm text-slate-300">
                                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500 mt-0.5" />
                                    {factor}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 border-l border-slate-700 pl-8 mt-6 md:mt-0">
                        <h4 className="text-sm font-semibold text-slate-400 mb-3">STRENGTHS</h4>
                        <div className="space-y-2">
                            {riskAssessment.strengths.map((str, idx) => (
                                <div key={idx} className="flex items-center text-sm text-white">
                                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                                    {str}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Section B: Debt Capacity */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-dark-card border border-slate-700/50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white flex items-center mb-6">
                        <DollarSign className="mr-2 h-6 w-6 text-green-400" />
                        Debt Capacity
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                            <span className="text-slate-400">Annual Revenue</span>
                            <span className="text-white font-mono">₹{debtCapacity.annualRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                            <span className="text-slate-400">Operating Profit</span>
                            <span className="text-white font-mono">₹{debtCapacity.operatingProfit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-slate-400">DSCR Ratio</span>
                            <div className="text-right">
                                <span className="block text-white font-bold text-lg">{debtCapacity.dscr}x</span>
                                <span className="text-xs text-slate-500">Target &gt; 1.25x</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary-900/40 to-slate-900 border border-primary-500/30 rounded-2xl p-6 flex flex-col justify-center text-center">
                    <h4 className="text-slate-400 font-medium mb-2">SAFE BORROWING LIMIT</h4>
                    <div className="text-4xl font-bold text-white mb-2">
                        ₹{debtCapacity.safeLimit.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-400 mb-6">
                        Max EMI: ₹{debtCapacity.monthlyEmiCap.toLocaleString()}/mo
                    </div>
                    <button
                        onClick={onNext}
                        className="bg-primary-600 hover:bg-primary-500 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-primary-900/20"
                    >
                        View Financial Products
                    </button>
                </div>
            </div>

            {/* Section C: Industry Benchmarks */}
            <div className="bg-dark-card border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white flex items-center mb-6">
                    <Activity className="mr-2 h-6 w-6 text-blue-400" />
                    Industry Benchmarks
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-700 text-slate-400 text-sm">
                                <th className="pb-3 font-medium">Metric</th>
                                <th className="pb-3 font-medium">You</th>
                                <th className="pb-3 font-medium">Industry Avg</th>
                                <th className="pb-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {Object.entries(benchmarks).map(([key, val]) => (
                                <tr key={key} className="border-b border-slate-800/50 last:border-0">
                                    <td className="py-4 text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                                    <td className="py-4 text-slate-300">{val.your}</td>
                                    <td className="py-4 text-slate-500">{val.industry}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${val.status === 'Best in Class' ? 'bg-green-500/10 text-green-400' :
                                            val.status === 'Good' ? 'bg-blue-500/10 text-blue-400' :
                                                'bg-yellow-500/10 text-yellow-400'
                                            }`}>
                                            {val.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Step9Analysis;
