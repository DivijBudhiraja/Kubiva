import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Briefcase, CreditCard } from 'lucide-react';
import Step4AIAnalysis from '../StartupFlow/Step4AIAnalysis';
import Step6Success from '../StartupFlow/Step6Success';

const IndividualFlowContainer = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const next = () => setStep(s => s + 1);

    const Step1IndivWelcome = () => (
        <div className="max-w-4xl mx-auto text-center animate-fadeIn py-12">
            <div className="mb-8 inline-flex items-center justify-center p-4 bg-rose-50 rounded-2xl">
                <User className="h-12 w-12 text-rose-600" />
            </div>
            <h1 className="text-4xl font-extrabold mb-6 text-slate-900">Personal Loans for <span className="text-rose-600">Professionals</span></h1>
            <p className="text-xl text-slate-500 mb-12">Get up to 3x your monthly salary instantly based on your career profile.</p>
            <button onClick={next} className="bg-rose-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-rose-700 transition-all shadow-xl shadow-rose-200">
                Check My Limit
            </button>
        </div>
    );

    const Step2IndivBasics = () => (
        <div className="max-w-xl mx-auto animate-fadeIn py-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Personal Details</h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Salary / Income</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3" placeholder="e.g. ₹1,50,000" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Employment Type</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-3 border rounded-xl hover:bg-rose-50 hover:border-rose-500 font-medium">Salaried</button>
                        <button className="p-3 border rounded-xl hover:bg-rose-50 hover:border-rose-500 font-medium">Freelancer</button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Pan Card</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3" placeholder="ABCDE1234F" />
                </div>
                <button onClick={next} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl mt-4">Next Step</button>
            </div>
        </div>
    );

    const Step3IndivConnect = () => (
        <div className="max-w-4xl mx-auto p-4 animate-fadeIn text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Link Income Source</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border p-6 rounded-xl hover:border-rose-500 cursor-pointer bg-white" onClick={next}>
                    <div className="h-12 w-12 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center mb-4 mx-auto font-bold text-xl">PF</div>
                    <h3 className="font-bold">EPFO / Provident Fund</h3>
                    <p className="text-sm text-slate-500">Fast employment check</p>
                </div>
                <div className="border p-6 rounded-xl hover:border-blue-500 cursor-pointer bg-white" onClick={next}>
                    <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto font-bold text-xl">Bk</div>
                    <h3 className="font-bold">Bank Statement</h3>
                    <p className="text-sm text-slate-500">Salary credit check</p>
                </div>
            </div>
        </div>
    );

    const Step5IndivOptions = () => (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Your Credit Offers</h2>
                <p className="text-slate-500">Based on your salary of ₹1.5L/mo</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { title: "Salary Advance", amount: "₹4.5 Lakhs", rate: "0% Interest (15 days)", icon: <Briefcase />, color: "text-blue-600", bg: "bg-blue-50" },
                    { title: "Personal Credit Line", amount: "₹10 Lakhs", rate: "11% APR", icon: <CreditCard />, color: "text-rose-600", bg: "bg-rose-50" },
                    { title: "BNPL Power", amount: "₹2 Lakhs", rate: "No Cost EMIs", icon: <User />, color: "text-purple-600", bg: "bg-purple-50" },
                ].map((p, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                        <div className={`h-12 w-12 ${p.bg} ${p.color} rounded-xl flex items-center justify-center mb-4`}>{p.icon}</div>
                        <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                        <div className="text-2xl font-bold text-slate-900 mb-1">{p.amount}</div>
                        <div className="text-sm text-slate-500 mb-6">{p.rate}</div>
                        <button onClick={next} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl">Unlock Offer</button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <div className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <button onClick={() => navigate('/')} className="text-slate-500 font-bold flex items-center"><ArrowLeft className="mr-2 h-4 w-4" /> Exit</button>
                    <div className="font-bold text-rose-700">INDIVIDUAL</div>
                </div>
            </div>
            <div className="pt-10">
                {step === 1 && <Step1IndivWelcome />}
                {step === 2 && <Step2IndivBasics />}
                {step === 3 && <Step3IndivConnect />}
                {step === 4 && <Step4AIAnalysis onNext={next} />}
                {step === 5 && <Step5IndivOptions />}
                {step === 6 && <Step6Success onFinish={() => navigate('/')} />}
            </div>
        </div>
    );
};

export default IndividualFlowContainer;
