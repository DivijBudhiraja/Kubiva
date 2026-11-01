import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Link } from 'lucide-react';
import Step1Welcome from './Step1Welcome';
import Step2Basics from './Step2Basics';
import Step3Connect from './Step3Connect';
import Step4AIAnalysis from './Step4AIAnalysis';
import Step5AIResults from './Step5AIResults';
import Step6Success from './Step6Success';
import ErrorBoundary from '../../components/ErrorBoundary';

const StartupFlowContainer = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        stage: '',
        foundingYear: '',
        city: '',
    });

    // Total steps for the new flow
    const totalSteps = 6;

    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    const onLoanSelected = (loan) => nextStep();

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1Welcome onNext={nextStep} />;
            case 2: return <Step2Basics data={formData} updateData={updateFormData} onNext={nextStep} />;
            case 3: return <Step3Connect onNext={nextStep} />;
            case 4: return <Step4AIAnalysis onNext={nextStep} />;
            case 5: return <Step5AIResults onNext={nextStep} />;
            case 6: return <Step6Success onFinish={() => navigate('/')} />;
            default: return <Step1Welcome onNext={nextStep} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans transition-colors duration-500">
            {/* Header / Progress Bar */}
            <div className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => currentStep === 1 ? navigate('/') : prevStep()}
                        className="text-slate-500 hover:text-teal-700 flex items-center transition-colors text-sm font-semibold"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> {currentStep === 1 ? 'Exit' : 'Back'}
                    </button>

                    <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-teal-600 mb-2 tracking-widest uppercase">
                            {currentStep === 4 ? 'AI ANALYSIS' : currentStep === 5 ? 'RESULTS' : currentStep === 6 ? 'SUCCESS' : `STEP ${currentStep} OF ${totalSteps}`}
                        </span>

                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5, 6].map(step => (
                                <div
                                    key={step}
                                    className={`h-1.5 w-8 rounded-full transition-all duration-300 ${step <= currentStep ? 'bg-teal-500' : 'bg-slate-200'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="w-16 flex justify-end">
                        <div className="h-8 w-8 bg-teal-50 rounded-full flex items-center justify-center text-teal-700">
                            <span className="font-bold text-xs">K</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col justify-start pt-10 px-4 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-green-100/40 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full">
                    <ErrorBoundary>
                        {renderStep()}
                    </ErrorBoundary>
                </div>
            </main>
        </div>
    );
};

export default StartupFlowContainer;
