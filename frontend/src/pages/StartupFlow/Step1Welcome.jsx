import React from 'react';
import { Rocket, Zap, Target, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

const Step1Welcome = ({ onNext }) => {
    return (
        <div className="max-w-4xl mx-auto text-center animate-fadeIn py-12">
            <div className="mb-10 inline-flex items-center justify-center p-4 bg-teal-50 rounded-2xl shadow-sm border border-teal-100">
                <Rocket className="h-12 w-12 text-teal-600" />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">
                Get Funded via <span className="text-teal-600">Smart Contract</span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
                Kubiva analyzes your data, mints your Financial Passport on-chain, and instantly matches you with retail investors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 bg-yellow-50 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="h-6 w-6 text-yellow-500" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Instant Liquidity</h3>
                    <p className="text-sm text-slate-500">Programmatic disbursement via smart contracts in 24-48 hours.</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                        <ShieldCheck className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Verified Trust</h3>
                    <p className="text-sm text-slate-500">Your Financial Passport NFT proves your creditworthiness.</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                        <Target className="h-6 w-6 text-purple-500" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Flexible Terms</h3>
                    <p className="text-sm text-slate-500">Revenue-based repayment smart contracts adapt to your sales.</p>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex items-center text-slate-400 text-sm mb-4 font-medium">
                    <Clock className="h-4 w-4 mr-2" /> Application takes less than 2 minutes
                </div>
                <button
                    onClick={onNext}
                    className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 px-10 rounded-xl transition-all flex items-center shadow-xl shadow-teal-900/10 hover:-translate-y-1"
                >
                    Start Blockchain Application <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default Step1Welcome;
