import React from 'react';
import { AlertTriangle, ShieldCheck, DollarSign, Activity, Award, ArrowRight } from 'lucide-react';

const Step10Passport = ({ results, onNext }) => {
    if (!results) return <div className="text-white">Loading data...</div>;

    const { riskAssessment, debtCapacity, benchmarks } = results;

    return (
        <div className="max-w-5xl mx-auto animate-fadeIn pb-12">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-600/20 border border-amber-500/30 text-amber-400 text-sm font-bold tracking-wide mb-4">
                    <Award className="h-4 w-4 mr-2" /> KUBIVA PASSPORT GRANTED
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Your Financial Identity</h2>
                <p className="text-slate-400">Verified analysis of your startup's health and borrowing power.</p>
            </div>

            {/* Passport Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 rounded-3xl overflow-hidden shadow-2xl relative mb-10 min-h-[400px]">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <ShieldCheck className="h-64 w-64 text-white" />
                </div>

                <div className="grid md:grid-cols-12 h-full">

                    {/* Left: Identity & Score */}
                    <div className="md:col-span-4 bg-slate-900/50 p-8 border-b md:border-b-0 md:border-r border-slate-700 flex flex-col items-center justify-center text-center">
                        <div className="h-24 w-24 rounded-full bg-slate-800 border-4 border-slate-700 mb-4 flex items-center justify-center overflow-hidden">
                            {/* Placeholder Logo */}
                            <span className="text-2xl font-bold text-slate-500">LOGO</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">Kubiva Tech</h3>
                        <p className="text-slate-400 text-sm mb-6">Bengaluru • SaaS • Seed</p>

                        <div className="w-full bg-slate-800 rounded-2xl p-4 border border-slate-700">
                            <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">KUBIVA SCORE</div>
                            <div className={`text-5xl font-black ${riskAssessment.score > 75 ? 'text-green-400' : 'text-yellow-400'
                                }`}>
                                {riskAssessment.score}
                            </div>
                            <div className={`font-bold mt-1 ${riskAssessment.score > 75 ? 'text-green-500' : 'text-yellow-500'
                                }`}>{riskAssessment.category} RISK</div>
                        </div>
                    </div>

                    {/* Right: Metrics Grid */}
                    <div className="md:col-span-8 p-8">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center">
                            <Activity className="h-4 w-4 mr-2" /> VERIFIED METRICS
                        </h4>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <div className="text-slate-400 text-sm mb-1">Annual Revenue (Run Rate)</div>
                                <div className="text-2xl font-bold text-white">₹{debtCapacity.annualRevenue.toLocaleString()}</div>
                                <div className="text-xs text-green-400 flex items-center mt-1">
                                    <Activity className="h-3 w-3 mr-1" /> Verified from Bank Stmt.
                                </div>
                            </div>
                            <div>
                                <div className="text-slate-400 text-sm mb-1">DSCR Ratio</div>
                                <div className="text-2xl font-bold text-white">{debtCapacity.dscr}x</div>
                                <div className="text-xs text-slate-500 mt-1">
                                    Industry Avg: 1.1x
                                </div>
                            </div>
                            <div>
                                <div className="text-slate-400 text-sm mb-1">Operating Profit</div>
                                <div className="text-2xl font-bold text-white">₹{debtCapacity.operatingProfit.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-slate-400 text-sm mb-1">Safe Borrowing Limit</div>
                                <div className="text-2xl font-bold text-primary-400">₹{debtCapacity.safeLimit.toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="border-t border-slate-700 pt-6">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">INDUSTRY BENCHMARKING</h4>
                            <div className="space-y-3">
                                {Object.entries(benchmarks).map(([key, val]) => (
                                    <div key={key} className="flex items-center justify-between text-sm">
                                        <span className="text-slate-300 capitalize w-1/3">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        <div className="flex-1 mx-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            {/* Mock visual bar */}
                                            <div className={`h-full rounded-full w-2/3 ${val.status === 'Best in Class' ? 'bg-green-500' : 'bg-yellow-500'
                                                }`}></div>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${val.status === 'Best in Class' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                            }`}>{val.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={onNext}
                    className="bg-primary-600 hover:bg-primary-500 text-white text-lg py-4 px-10 rounded-xl font-bold transition-all shadow-xl shadow-primary-900/30 flex items-center"
                >
                    View Enabled Products <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default Step10Passport;
