import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, TrendingUp, HandCoins } from 'lucide-react';
import Step4AIAnalysis from '../StartupFlow/Step4AIAnalysis';
import Step6Success from '../StartupFlow/Step6Success';

// SME Specific Components inline for speed (can extract later)
const Step1SMEWelcome = ({ onNext }) => (
    <div className="max-w-4xl mx-auto text-center animate-fadeIn py-12">
        <div className="mb-8 inline-flex items-center justify-center p-4 bg-indigo-50 rounded-2xl">
            <Building2 className="h-12 w-12 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-extrabold mb-6 text-slate-900">Smart Capital for Your <span className="text-indigo-600">Business</span></h1>
        <p className="text-xl text-slate-500 mb-12">Working capital and expansion loans approved in minutes via GST analysis.</p>
        <button onClick={onNext} className="bg-indigo-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
            Check Eligibility
        </button>
    </div>
);

const Step2SMEBasics = ({ onNext }) => {
    return (
        <div className="max-w-xl mx-auto animate-fadeIn py-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Business Details</h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Business Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3" placeholder="e.g. ABC Trading Pvt Ltd" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Annual Turnover</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3" placeholder="e.g. ₹2 Cr" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">GST Number</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3" placeholder="GSTIN..." />
                </div>
                <button onClick={onNext} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl mt-4">Next Step</button>
            </div>
        </div>
    );
};

const Step3SMEConnect = ({ onNext }) => (
    <div className="max-w-4xl mx-auto p-4 animate-fadeIn text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Verify Business Data</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border p-6 rounded-xl hover:border-indigo-500 cursor-pointer bg-white" onClick={onNext}>
                <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4 mx-auto font-bold text-xl">Tax</div>
                <h3 className="font-bold">Connect GST Portal</h3>
                <p className="text-sm text-slate-500">Instant turnover verification</p>
            </div>
            <div className="border p-6 rounded-xl hover:border-green-500 cursor-pointer bg-white" onClick={onNext}>
                <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto font-bold text-xl">Bank</div>
                <h3 className="font-bold">NetBanking Fetch</h3>
                <p className="text-sm text-slate-500">Verify cash flow</p>
            </div>
        </div>
    </div>
);

const Step5SMEOptions = ({ onNext }) => (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">SME Loan Offers</h2>
            <p className="text-slate-500">Tailored for manufacturing & trading businesses.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
            {[
                { title: "Working Capital OD", amount: "₹50 Lakhs", rate: "10% APR", icon: <TrendingUp />, color: "text-blue-600", bg: "bg-blue-50" },
                { title: "Invoice Discounting", amount: "90% of Invoice", rate: "1.2% / mo", icon: <HandCoins />, color: "text-green-600", bg: "bg-green-50" },
                { title: "Machinery Loan", amount: "₹2 Cr", rate: "9% APR", icon: <Building2 />, color: "text-orange-600", bg: "bg-orange-50" },
            ].map((p, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                    <div className={`h-12 w-12 ${p.bg} ${p.color} rounded-xl flex items-center justify-center mb-4`}>{p.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{p.amount}</div>
                    <div className="text-sm text-slate-500 mb-6">{p.rate}</div>
                    <button onClick={onNext} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl">Select</button>
                </div>
            ))}
        </div>
    </div>
);

const BusinessFlowContainer = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const next = () => setStep(s => s + 1);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <div className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <button onClick={() => navigate('/')} className="text-slate-500 font-bold flex items-center"><ArrowLeft className="mr-2 h-4 w-4" /> Exit</button>
                    <div className="font-bold text-indigo-700">BUSINESS</div>
                </div>
            </div>
            <div className="pt-10">
                {step === 1 && <Step1SMEWelcome onNext={next} />}
                {step === 2 && <Step2SMEBasics onNext={next} />}
                {step === 3 && <Step3SMEConnect onNext={next} />}
                {step === 4 && <Step4AIAnalysis onNext={next} />}
                {step === 5 && <Step5SMEOptions onNext={next} />}
                {step === 6 && <Step6Success onFinish={() => navigate('/')} />}
            </div>
        </div>
    );
};

export default BusinessFlowContainer;
