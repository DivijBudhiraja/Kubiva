import React, { useState } from 'react';
import { Upload, CheckCircle, Smartphone, Database, FileText, Lock } from 'lucide-react';

const Step8Connect = ({ onNext }) => {
    const [connected, setConnected] = useState({
        accounting: false,
        banking: false,
        commerce: false
    });
    const [files, setFiles] = useState([]);

    const handleConnect = (type) => {
        // Toggle mock connection
        setConnected(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const handleFileUpload = (e) => {
        const newFiles = Array.from(e.target.files).map(f => f.name);
        setFiles(prev => [...prev, ...newFiles]);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn pb-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-3">Connect Your Data</h2>
                <p className="text-slate-400">Securely link your accounts to get the highest credit limit. <br />AI verifies your data instantly. No manual paperwork.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Integration Section */}
                <div className="bg-dark-card border border-slate-700 rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-6 flex items-center">
                        <Database className="mr-2 h-5 w-5 text-primary-400" /> Live Integrations
                    </h3>

                    <div className="space-y-4">
                        {/* Accounting */}
                        <div className={`p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${connected.accounting ? 'bg-primary-900/20 border-primary-500' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
                            onClick={() => handleConnect('accounting')}>
                            <div className="flex items-center">
                                <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white mr-4">qb</div>
                                <div>
                                    <div className="text-white font-medium">Accounting</div>
                                    <div className="text-xs text-slate-400">QuickBooks, Xero, Zoho</div>
                                </div>
                            </div>
                            {connected.accounting && <CheckCircle className="text-green-400 h-5 w-5" />}
                        </div>

                        {/* Banking */}
                        <div className={`p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${connected.banking ? 'bg-primary-900/20 border-primary-500' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
                            onClick={() => handleConnect('banking')}>
                            <div className="flex items-center">
                                <div className="h-10 w-10 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white mr-4">H</div>
                                <div>
                                    <div className="text-white font-medium">Banking</div>
                                    <div className="text-xs text-slate-400">HDFC, ICICI, SBI (NetBanking)</div>
                                </div>
                            </div>
                            {connected.banking && <CheckCircle className="text-green-400 h-5 w-5" />}
                        </div>

                        {/* Commerce */}
                        <div className={`p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${connected.commerce ? 'bg-primary-900/20 border-primary-500' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
                            onClick={() => handleConnect('commerce')}>
                            <div className="flex items-center">
                                <div className="h-10 w-10 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white mr-4">S</div>
                                <div>
                                    <div className="text-white font-medium">Commerce</div>
                                    <div className="text-xs text-slate-400">Stripe, Razorpay, Shopify</div>
                                </div>
                            </div>
                            {connected.commerce && <CheckCircle className="text-green-400 h-5 w-5" />}
                        </div>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="bg-dark-card border border-slate-700 rounded-2xl p-6 flex flex-col">
                    <h3 className="text-white font-bold mb-6 flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-purple-400" /> Manual Upload
                    </h3>

                    <div className="flex-1 border-2 border-dashed border-slate-700 hover:border-primary-500 bg-slate-800/50 rounded-xl flex flex-col items-center justify-center p-8 transition-colors">
                        <Upload className="h-12 w-12 text-slate-500 mb-4" />
                        <p className="text-slate-300 font-medium mb-2">Drag & Drop files here</p>
                        <p className="text-xs text-slate-500 text-center mb-6">Bank Statements (PDF), Pitch Deck, Financial Models</p>
                        <label className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors text-sm">
                            Browse Files
                            <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                        </label>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {files.map((f, i) => (
                                <div key={i} className="flex items-center text-sm text-slate-300 bg-slate-800 px-3 py-2 rounded-lg">
                                    <FileText className="h-4 w-4 mr-2 text-primary-400" />
                                    {f}
                                    <CheckCircle className="h-3 w-3 text-green-500 ml-auto" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex items-center text-xs text-slate-500 mb-4">
                    <Lock className="h-3 w-3 mr-1" /> End-to-end encrypted & SOC2 Compliant
                </div>
                <button
                    onClick={onNext}
                    className="bg-primary-600 hover:bg-primary-500 text-white py-4 px-12 rounded-full font-bold shadow-lg shadow-primary-900/20 hover:scale-105 transition-all"
                >
                    {Object.values(connected).some(x => x) || files.length > 0 ? "Analyze My Data" : "Skip & Analyze (Limit may be lower)"}
                </button>
            </div>
        </div>
    );
};

export default Step8Connect;
