import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const INDUSTRIES = [
    { id: 'saas', label: 'SaaS', sub: 'B2B Software' },
    { id: 'fintech', label: 'Fintech', sub: 'Financial Services' },
    { id: 'd2c', label: 'D2C / E-commerce', sub: 'Direct to Consumer' },
    { id: 'marketplace', label: 'Marketplace', sub: 'Platform for buyers/sellers' },
    { id: 'edtech', label: 'EdTech', sub: 'Education Technology' },
    { id: 'healthtech', label: 'HealthTech', sub: 'Healthcare/Wellness' }
];

const STAGES = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Bootstrapped'];
const YEARS = Array.from({ length: 7 }, (_, i) => 2024 - i);
const CITIES = ['Bangalore', 'Delhi', 'Mumbai', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Other'];

const Step2Basics = ({ data, updateData, onNext }) => {
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!data.companyName) newErrors.companyName = 'Company name is required';
        if (!data.industry) newErrors.industry = 'Please select an industry';
        if (!data.stage) newErrors.stage = 'Please select your current stage';
        if (!data.foundingYear) newErrors.foundingYear = 'Founding year is required';
        if (!data.city) newErrors.city = 'Headquarters city is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            onNext();
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-fadeIn py-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Company Basics</h2>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="space-y-6">
                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                        <input
                            type="text"
                            value={data.companyName || ''}
                            onChange={(e) => updateData({ companyName: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                            placeholder="e.g. Kubiva Tech"
                        />
                        {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                    </div>

                    {/* Industry Selection */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">Industry</label>
                        <div className="grid grid-cols-2 gap-3">
                            {INDUSTRIES.map((ind) => (
                                <button
                                    key={ind.id}
                                    onClick={() => updateData({ industry: ind.id })}
                                    className={`
                      p-3 rounded-xl border text-left transition-all
                      ${data.industry === ind.id
                                            ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500'
                                            : 'bg-white border-slate-200 hover:border-teal-300 hover:shadow-sm'}
                    `}
                                >
                                    <div className={`font-semibold ${data.industry === ind.id ? 'text-teal-900' : 'text-slate-800'}`}>
                                        {ind.label}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">{ind.sub}</div>
                                </button>
                            ))}
                        </div>
                        {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Current Stage */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Current Stage</label>
                            <select
                                value={data.stage || ''}
                                onChange={(e) => updateData({ stage: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-3 text-slate-900 focus:outline-none focus:border-teal-500"
                            >
                                <option value="">Select Stage</option>
                                {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.stage && <p className="text-red-500 text-sm mt-1">{errors.stage}</p>}
                        </div>

                        {/* Founding Year */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Founding Year</label>
                            <select
                                value={data.foundingYear || ''}
                                onChange={(e) => updateData({ foundingYear: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-3 text-slate-900 focus:outline-none focus:border-teal-500"
                            >
                                <option value="">Select Year</option>
                                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            {errors.foundingYear && <p className="text-red-500 text-sm mt-1">{errors.foundingYear}</p>}
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Headquarters</label>
                            <select
                                value={data.city || ''}
                                onChange={(e) => updateData({ city: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-3 text-slate-900 focus:outline-none focus:border-teal-500"
                            >
                                <option value="">Select City</option>
                                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                        <button
                            onClick={handleNext}
                            className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-10 rounded-xl transition-all flex items-center shadow-lg shadow-teal-900/10 hover:-translate-y-1"
                        >
                            Continue to Connect Data <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2Basics;
