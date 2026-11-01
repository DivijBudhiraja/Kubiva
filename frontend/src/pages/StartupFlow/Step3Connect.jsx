import React, { useState } from 'react';
import { Upload, CheckCircle, Database, Lock, ArrowRight } from 'lucide-react';

const Step3Connect = ({ onNext }) => {
    const [connected, setConnected] = useState({});

    const toggleConnect = (key) => setConnected(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Connect Data Sources</h2>
                <p className="text-slate-500">We use read-only APIs to verify your financials and mint your Financial Passport.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
                {/* Integration Cards */}
                {[
                    { id: 'accounting', name: 'Accounting', providers: 'QuickBooks, Xero', icon: 'A', color: 'bg-blue-600' },
                    { id: 'banking', name: 'Banking', providers: 'HDFC, ICICI, SBI', icon: 'B', color: 'bg-red-600' },
                    { id: 'commerce', name: 'Commerce', providers: 'Stripe, Shopify', icon: 'S', color: 'bg-indigo-600' },
                    { id: 'gst', name: 'GST / Tax', providers: 'Government Portal', icon: 'T', color: 'bg-orange-600' },
                ].map((item) => (
                    <div
                        key={item.id}
                        onClick={() => toggleConnect(item.id)}
                        className={`cursor-pointer rounded-xl p-5 border transition-all duration-200 flex items-center justify-between ${connected[item.id]
                            ? 'bg-teal-50 border-teal-500 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-md'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className={`h-12 w-12 ${item.color} rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md`}>
                                {item.icon}
                            </div>
                            <div>
                                <div className="font-bold text-slate-800">{item.name}</div>
                                <div className="text-xs text-slate-500">{item.providers}</div>
                            </div>
                        </div>
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${connected[item.id] ? 'bg-teal-500 border-teal-500' : 'border-slate-300'
                            }`}>
                            {connected[item.id] && <CheckCircle className="h-4 w-4 text-white" />}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 p-8 text-center hover:bg-slate-100 transition-colors mb-8 cursor-pointer group">
                <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3 group-hover:text-teal-600 transition-colors" />
                <h4 className="text-slate-700 font-semibold">Upload Pitch Deck or Statements</h4>
                <p className="text-xs text-slate-500">PDF, Excel supported (Optional)</p>
            </div>

            <div className="flex flex-col items-center">
                <button
                    onClick={onNext}
                    className="bg-teal-800 hover:bg-teal-900 text-white text-lg px-12 py-4 rounded-xl font-bold shadow-lg transition-all hover:scale-105 flex items-center"
                >
                    Analyze Financial Data <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <div className="flex items-center text-xs text-slate-400 mt-4">
                    <Lock className="h-3 w-3 mr-1" /> Data is encrypted and used only for verification
                </div>
            </div>
        </div>
    );
};

export default Step3Connect;
