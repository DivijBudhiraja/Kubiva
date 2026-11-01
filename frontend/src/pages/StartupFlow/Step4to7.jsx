
import React, { useState } from 'react';
import { ArrowRight, TrendingUp, DollarSign, Users, Target } from 'lucide-react';

/* --- Shared Components --- */
const FormWrapper = ({ title, icon: Icon, children, onNext, isValid, hideButton = false }) => (
    <div className="max-w-2xl mx-auto animate-fadeIn">
        <div className="flex items-center mb-6">
            <div className="bg-primary-900/30 p-2 rounded-lg mr-3">
                <Icon className="h-6 w-6 text-primary-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>

        <div className="space-y-6">
            {children}

            {!hideButton && (
                <div className="pt-4 flex justify-end">
                    <button
                        onClick={onNext}
                        className={`bg - primary - 600 hover: bg - primary - 500 text - white font - semibold py - 3 px - 8 rounded - xl transition - all flex items - center shadow - lg shadow - primary - 900 / 20 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''} `}
                    // disabled={!isValid} // Optional: strictly disable button vs showing validation on click
                    >
                        Continue <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    </div>
);

const Input = ({ label, value, onChange, type = "text", placeholder, suffix }) => (
    <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">{label}</label>
        <div className="relative">
            <input
                type={type}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder={placeholder}
            />
            {suffix && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">{suffix}</span>
            )}
        </div>
    </div>
);

/* --- Step 4: Growth Metrics --- */
export const Step4Growth = ({ data, updateData, onNext }) => {
    const isValid = data.momRevenueGrowth && data.newCustomers && data.pmFit && data.payingRatio && data.netRetention;

    const handleNext = () => {
        // Basic validation could go here
        if (isValid) onNext();
        else alert('Please fill all fields');
    };

    return (
        <FormWrapper title="Growth Metrics" icon={TrendingUp} onNext={handleNext} isValid={isValid}>
            <Input
                label="Month-over-Month Revenue Growth"
                value={data.momRevenueGrowth}
                onChange={val => updateData({ momRevenueGrowth: val })}
                type="number" suffix="%"
            />
            <Input
                label="New Customers Per Month"
                value={data.newCustomers}
                onChange={val => updateData({ newCustomers: val })}
                type="number"
            />

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Product-Market Fit</label>
                <div className="grid grid-cols-3 gap-3">
                    {['Yes', 'No', 'Progressing'].map(opt => (
                        <button
                            key={opt}
                            onClick={() => updateData({ pmFit: opt })}
                            className={`p - 3 rounded - lg border text - sm font - medium transition - all ${data.pmFit === opt ? 'bg-primary-900/30 border-primary-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'} `}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Paying vs Free User Ratio"
                    value={data.payingRatio}
                    onChange={val => updateData({ payingRatio: val })}
                    type="number" suffix="%"
                />
                <Input
                    label="Net Retention Rate"
                    value={data.netRetention}
                    onChange={val => updateData({ netRetention: val })}
                    type="number" suffix="%"
                />
            </div>
        </FormWrapper>
    );
};

/* --- Step 5: Funding History --- */
export const Step5Funding = ({ data, updateData, onNext }) => {
    const isValid = data.totalRaised && data.investorTypes?.length > 0 && data.valuation && data.lastFundingDate && data.termSheet;

    const toggleInvestor = (type) => {
        const current = data.investorTypes || [];
        const updated = current.includes(type)
            ? current.filter(t => t !== type)
            : [...current, type];
        updateData({ investorTypes: updated });
    };

    return (
        <FormWrapper title="Funding History" icon={DollarSign} onNext={() => isValid ? onNext() : alert('Please fill all fields')} isValid={isValid}>
            <Input
                label="Total Raised Till Date (₹)"
                value={data.totalRaised}
                onChange={val => updateData({ totalRaised: val })}
                type="number"
            />

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Investor Types</label>
                <div className="flex flex-wrap gap-2">
                    {['Angels', 'VCs', 'Family Office', 'Bootstrap', 'Corporate'].map(type => (
                        <button
                            key={type}
                            onClick={() => toggleInvestor(type)}
                            className={`px - 3 py - 2 rounded - lg border text - xs font - medium transition - all ${data.investorTypes?.includes(type) ? 'bg-primary-900/30 border-primary-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'} `}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Latest Valuation (₹)"
                    value={data.valuation}
                    onChange={val => updateData({ valuation: val })}
                    type="number"
                />
                <Input
                    label="Last Funding Date"
                    value={data.lastFundingDate}
                    onChange={val => updateData({ lastFundingDate: val })}
                    type="date"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Do you have a term sheet?</label>
                <div className="grid grid-cols-3 gap-3">
                    {['Yes', 'No', 'In talks'].map(opt => (
                        <button
                            key={opt}
                            onClick={() => updateData({ termSheet: opt })}
                            className={`p - 3 rounded - lg border text - sm font - medium transition - all ${data.termSheet === opt ? 'bg-primary-900/30 border-primary-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'} `}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </FormWrapper>
    );
};

/* --- Step 6: Team Information --- */
export const Step6Team = ({ data, updateData, onNext }) => {
    const isValid = data.coFounders && data.teamSize && data.avgExperience && data.hasCFO;

    return (
        <FormWrapper title="Team Information" icon={Users} onNext={() => isValid ? onNext() : alert('Please fill all fields')} isValid={isValid}>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Number of Co-founders"
                    value={data.coFounders}
                    onChange={val => updateData({ coFounders: val })}
                    type="number"
                />
                <Input
                    label="Total Team Size"
                    value={data.teamSize}
                    onChange={val => updateData({ teamSize: val })}
                    type="number"
                />
            </div>

            <Input
                label="Average Team Experience (Years)"
                value={data.avgExperience}
                onChange={val => updateData({ avgExperience: val })}
                type="number"
            />

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Do you have a CFO or Finance Lead?</label>
                <div className="grid grid-cols-3 gap-3">
                    {['Yes', 'No', 'Part-time'].map(opt => (
                        <button
                            key={opt}
                            onClick={() => updateData({ hasCFO: opt })}
                            className={`p - 3 rounded - lg border text - sm font - medium transition - all ${data.hasCFO === opt ? 'bg-primary-900/30 border-primary-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'} `}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </FormWrapper>
    );
};

/* --- Step 7: Use of Funds --- */
export const Step7Use = ({ data, updateData, onNext }) => {
    const isValid = data.useOfFunds && data.expectedGrowthImpact && data.roiTimeline;

    return (
        <FormWrapper title="Use of Funds" icon={Target} onNext={() => { }} isValid={isValid} hideButton={true}>
            {/* We override the default button by passing empty onNext and hiding it, or better yet, refactor wrapper. 
            For speed, let's just not use FormWrapper's button and add our own. 
        */}
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Primary Use of Funds</label>
                <div className="grid grid-cols-2 gap-3">
                    {['Hiring', 'Product Dev', 'Marketing', 'Operations', 'Inventory'].map(opt => (
                        <button
                            key={opt}
                            onClick={() => updateData({ useOfFunds: opt })}
                            className={`p - 3 rounded - lg border text - sm font - medium transition - all ${data.useOfFunds === opt ? 'bg-primary-900/30 border-primary-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'} `}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            <Input
                label="Expected Revenue Growth Impact"
                value={data.expectedGrowthImpact}
                onChange={val => updateData({ expectedGrowthImpact: val })}
                type="number" suffix="%"
            />

            <Input
                label="Timeline to Positive ROI (Months)"
                value={data.roiTimeline}
                onChange={val => updateData({ roiTimeline: val })}
                type="number"
            />

            <div className="pt-8 flex justify-end">
                <button
                    onClick={() => isValid ? onNext() : alert('Please fill all fields')}
                    className={`bg - gradient - to - r from - primary - 600 to - purple - 600 hover: from - primary - 500 hover: to - purple - 500 text - white font - bold py - 4 px - 8 rounded - xl transition - all flex items - center shadow - lg shadow - primary - 900 / 20 hover: scale - 105 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''} `}
                >
                    Get AI Recommendations <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </div>
        </FormWrapper>
    );
};

