import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight, Download, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

const Step6Success = ({ onFinish }) => {

    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn flex flex-col items-center">

            <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-scaleIn">
                <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>

            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Application Submitted!</h2>
            <p className="text-lg text-slate-500 text-center max-w-xl mb-12">
                Your loan application has been successfully processed. The AI analysis and your offer have been forwarded to our lending partners for final disbursement.
            </p>

            <div className="bg-white w-full rounded-2xl shadow-xl border border-slate-100 overflow-hidden mb-10">
                <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-slate-700">Application Summary</h3>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">APPROVED</span>
                </div>
                <div className="p-8 grid md:grid-cols-2 gap-8">
                    <div>
                        <div className="text-sm text-slate-400 uppercase tracking-widest mb-4">Loan Details</div>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Amount</span>
                                <span className="font-bold text-slate-900">$100,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Product</span>
                                <span className="font-bold text-slate-900">Hybrid Growth Capital</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Term</span>
                                <span className="font-bold text-slate-900">12 Months</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-l border-slate-100 pl-8">
                        <div className="text-sm text-slate-400 uppercase tracking-widest mb-4">What Happens Next</div>
                        <div className="space-y-6 relative">
                            {/* Timeline Line */}
                            <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-slate-200"></div>

                            <div className="relative pl-6">
                                <div className="absolute left-[-5px] top-1.5 w-3 h-3 bg-emerald-500 rounded-full ring-4 ring-white"></div>
                                <div className="font-bold text-slate-900">Verification</div>
                                <div className="text-xs text-slate-500">Automated checks passed</div>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute left-[-5px] top-1.5 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-white"></div>
                                <div className="font-bold text-slate-900">Disbursement</div>
                                <div className="text-xs text-slate-500 flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" /> Est. within 24 hours
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 flex items-center transition-colors">
                    <Download className="mr-2 h-4 w-4" /> Download Term Sheet
                </button>
                <button
                    onClick={onFinish}
                    className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg hover:-translate-y-1 transition-all flex items-center"
                >
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </button>
            </div>

        </div>
    );
};

export default Step6Success;
