import React, { useState } from 'react';
import { CheckCircle, FileText, Loader2, ArrowRight, Download } from 'lucide-react';

const Step12Finalization = ({ product, formData, onFinish }) => {
    const [agreed, setAgreed] = useState(false);
    const [addOns, setAddOns] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [successData, setSuccessData] = useState(null);

    const toggleAddOn = (addOn) => {
        setAddOns(prev => prev.includes(addOn) ? prev.filter(x => x !== addOn) : [...prev, addOn]);
    };

    const handleSubmit = async () => {
        if (!agreed) return;
        setSubmitting(true);
        try {
            const payload = {
                formData,
                selectedProduct: product,
                termsAccepted: agreed,
                addOns
            };

            const response = await fetch('http://localhost:8000/api/startups/create-application', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            setSuccessData(result);
        } catch (error) {
            console.error(error);
            // Fallback for prototype if offline
            setTimeout(() => setSuccessData({
                status: "success",
                applicationId: "APP-MOCK-999",
                approvedAmount: product?.amount || "₹50L",
                productName: product?.name,
                nextSteps: []
            }), 1500);
        }
    };

    if (successData) {
        return (
            <div className="max-w-2xl mx-auto animate-fadeIn text-center pt-8">
                <div className="bg-green-500/10 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
                <p className="text-slate-300 mb-8">
                    Your application for <b className="text-white">{successData.approvedAmount}</b> has been received.
                    Your ID is <code className="bg-slate-800 px-2 py-1 rounded text-primary-400">{successData.applicationId}</code>.
                </p>

                <div className="bg-dark-card border border-slate-700 rounded-xl p-6 text-left max-w-lg mx-auto mb-8">
                    <h3 className="text-white font-semibold mb-4">Next Steps</h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="h-2 w-2 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                            <span className="text-slate-300 text-sm">KYC Verification (24 hours)</span>
                        </div>
                        <div className="flex items-center opacity-50">
                            <div className="h-2 w-2 bg-slate-600 rounded-full mr-3"></div>
                            <span className="text-slate-300 text-sm">Disbursal Approval</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium flex items-center">
                        <Download className="mr-2 h-4 w-4" /> Offer Letter
                    </button>
                    <button onClick={onFinish} className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-medium">
                        Done
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto animate-fadeIn pb-12">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Finalize Application</h2>
            <p className="text-center text-slate-400 mb-10">Review your selected product and terms.</p>

            {/* Application Summary */}
            <div className="bg-dark-card border border-slate-700 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4">Product Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="block text-slate-500">Product</span>
                        <span className="block text-white font-medium">{product.name}</span>
                    </div>
                    <div>
                        <span className="block text-slate-500">Amount</span>
                        <span className="block text-white font-medium">{product.amount}</span>
                    </div>
                    <div>
                        <span className="block text-slate-500">Duration</span>
                        <span className="block text-white font-medium">{product.tenure}</span>
                    </div>
                    <div>
                        <span className="block text-slate-500">First Payment</span>
                        <span className="block text-white font-medium">Auto-calculated</span>
                    </div>
                </div>
            </div>

            {/* Add-ons */}
            <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-4">Optional Protection</h3>
                <div className="space-y-3">
                    {['Life Insurance (+2%)', 'Business Interruption (+1.5%)'].map(opt => (
                        <label key={opt} className="flex items-center p-4 bg-slate-800/50 border border-slate-700 rounded-xl cursor-pointer hover:border-slate-600 transition-all">
                            <input
                                type="checkbox"
                                checked={addOns.includes(opt)}
                                onChange={() => toggleAddOn(opt)}
                                className="h-5 w-5 rounded border-slate-600 bg-slate-900 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-3 text-slate-300">{opt}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* T&C */}
            <div className="mb-8">
                <label className="flex items-start cursor-pointer group">
                    <div className="flex items-center h-5">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="h-5 w-5 rounded border-slate-600 bg-slate-900 text-primary-600 focus:ring-primary-500"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <p className="text-slate-400 group-hover:text-slate-300">
                            I agree to the <span className="text-primary-400 underline">Terms & Conditions</span> and authorize Kubiva to process my application.
                        </p>
                    </div>
                </label>
            </div>

            <button
                onClick={handleSubmit}
                disabled={!agreed || submitting}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all ${agreed && !submitting
                        ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-900/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
            >
                {submitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
                {submitting ? 'Submitting Application...' : 'Accept & Submit Application'}
            </button>
        </div>
    );
};

export default Step12Finalization;
