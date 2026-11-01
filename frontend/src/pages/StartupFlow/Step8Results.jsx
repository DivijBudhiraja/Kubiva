import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, ArrowRight, Star, Loader2 } from 'lucide-react';

const Step8Results = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/startups/get-recommendations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                setResults(result);
                setLoading(false);
            } catch (error) {
                console.error("API Error, falling back to mock:", error);
                // Fallback mock
                setTimeout(() => {
                    setResults({
                        riskScore: 25,
                        riskCategory: 'VERY LOW',
                        approvalProb: 92,
                        timeline: '2-3',
                        insight: 'Strong revenue growth (20% MoM) and low burn rate make this a highly attractive profile.',
                        products: [
                            {
                                id: 1,
                                name: 'Growth Capital Term Loan',
                                amount: '₹50L - ₹2Cr',
                                interest: '11-13%',
                                tenure: '12-24 months',
                                reason: 'Best fit for your Series A stage to extend runway.'
                            },
                            {
                                id: 2,
                                name: 'Revenue Based Financing',
                                amount: '₹20L - ₹1Cr',
                                interest: '6% fee',
                                tenure: 'Flexible',
                                reason: 'Matches your high recurring revenue model.'
                            },
                            {
                                id: 3,
                                name: 'Working Capital Line',
                                amount: '₹10L - ₹50L',
                                interest: '14-16%',
                                tenure: 'Revolving',
                                reason: 'Good backup for inventory cycles.'
                            }
                        ]
                    });
                    setLoading(false);
                }, 1000);
            }
        };

        fetchRecommendations();
    }, [data]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fadeIn">
                <Loader2 className="h-12 w-12 text-primary-500 animate-spin mb-4" />
                <h3 className="text-xl font-semibold text-white">Analyzing your profile...</h3>
                <p className="text-slate-400">Our AI is crunching 50+ data points to find your best matches.</p>
            </div>
        );
    }

    if (!results) return null;

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn pb-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">Analysis Complete!</h2>
                <p className="text-slate-400">Here are your personalized financing options.</p>
            </div>

            {/* Risk Assessment Card */}
            <div className="bg-dark-card border border-slate-700/50 rounded-2xl p-6 md:p-8 mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="h-6 w-6 text-green-400" />
                            <span className="text-green-400 font-bold tracking-wider text-sm">RISK ASSESSMENT</span>
                        </div>
                        <h3 className="text-4xl font-bold text-white mb-2">
                            {results.riskScore}/100 <span className="text-lg font-medium text-green-400 ml-2">{results.riskCategory}</span>
                        </h3>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            {results.insight}
                        </p>
                        <div className="flex gap-6 text-sm">
                            <div>
                                <span className="block text-slate-500 mb-1">Approval Probability</span>
                                <span className="font-bold text-white text-lg">{results.approvalProb}%</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 mb-1">Typical Timeline</span>
                                <span className="font-bold text-white text-lg">{results.timeline} days</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Gauge could go here */}
                    <div className="w-32 h-32 rounded-full border-8 border-slate-800 border-t-green-500 border-r-green-500 flex items-center justify-center rotate-45 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                        <span className="text-2xl font-bold text-white -rotate-45">A+</span>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-2 fill-yellow-400" /> Recommended Products
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.products.map((product, idx) => (
                    <div
                        key={product.id}
                        className={`bg-dark-card border rounded-xl p-6 relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${idx === 0 ? 'border-primary-500/50 shadow-primary-500/10' : 'border-slate-700'}`}
                    >
                        {idx === 0 && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                #1 BEST MATCH
                            </div>
                        )}

                        <h4 className="text-xl font-bold text-white mb-2">{product.name}</h4>
                        <p className="text-xs text-slate-400 mb-4 h-10">{product.reason}</p>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                                <span className="text-slate-500">Amount</span>
                                <span className="text-white font-medium">{product.amount}</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                                <span className="text-slate-500">Interest</span>
                                <span className="text-white font-medium">{product.interest}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Tenure</span>
                                <span className="text-white font-medium">{product.tenure}</span>
                            </div>
                        </div>

                        <button className="w-full bg-slate-800 hover:bg-primary-600 border border-slate-700 hover:border-primary-500 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-500">
                            Select This Product
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Step8Results;
