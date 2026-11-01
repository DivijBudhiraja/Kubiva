import React, { useEffect, useState } from 'react';
import { Loader2, Brain, Check, BarChart, FileText, Search } from 'lucide-react';

const Step4AIAnalysis = ({ onNext }) => {
    const [status, setStatus] = useState("Initializing Kubiva AI...");
    const [progress, setProgress] = useState(0);
    const [itemsInfo, setItemsInfo] = useState([
        { text: "Extracting Financial Data", icon: FileText, active: false, done: false },
        { text: "Analyzing Cash Flow Patterns", icon: BarChart, active: false, done: false },
        { text: "Risk Scoring & Benchmarking", icon: Search, active: false, done: false },
        { text: "Matching Best Loan Products", icon: Brain, active: false, done: false },
    ]);

    useEffect(() => {
        // Animation Sequence
        let currentStep = 0;

        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + 1, 100)); // Smooth progress bar
        }, 60);

        const stepTimer = setInterval(() => {
            if (currentStep < itemsInfo.length) {
                setItemsInfo(prev => {
                    if (currentStep >= prev.length) {
                        console.warn('Step4AIAnalysis: currentStep out of bounds', currentStep, prev.length);
                        return prev;
                    }
                    const newItems = prev.map(item => ({ ...item })); // Deep copy for safety regarding these props
                    if (currentStep > 0 && newItems[currentStep - 1]) newItems[currentStep - 1].done = true;
                    if (newItems[currentStep]) newItems[currentStep].active = true;
                    return newItems;
                });
                setStatus(itemsInfo[currentStep]?.text + "...");
                currentStep++;
            } else {
                clearInterval(stepTimer);
                clearInterval(interval);
                setStatus("Analysis Complete!");
                setTimeout(onNext, 1000); // Wait a bit before navigating
            }
        }, 1500); // 1.5s per step

        return () => {
            clearInterval(interval);
            clearInterval(stepTimer);
        };
    }, [onNext, itemsInfo.length]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn w-full max-w-2xl mx-auto">

            {/* Central Visual */}
            <div className="relative mb-12">
                <div className="absolute inset-0 bg-teal-500 rounded-full blur-[60px] opacity-20 animate-pulse"></div>
                <div className="relative h-32 w-32 bg-slate-900 border-2 border-teal-500/50 rounded-full flex items-center justify-center shadow-2xl shadow-teal-500/20">
                    <Brain className="h-16 w-16 text-teal-400 animate-pulse" />
                </div>
                {/* Visual particles */}
                <div className="absolute top-0 right-0 h-4 w-4 bg-purple-500 rounded-full blur-sm animate-bounce" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-4 left-0 h-3 w-3 bg-blue-500 rounded-full blur-sm animate-bounce" style={{ animationDuration: '2s' }}></div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-8">{status}</h2>

            {/* Checklist */}
            <div className="w-full space-y-4 mb-8 px-8">
                {itemsInfo.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <div key={idx} className={`flex items-center p-3 rounded-xl border transition-all duration-500 ${item.active || item.done
                            ? 'bg-white border-teal-200 shadow-sm translate-x-0 opacity-100'
                            : 'bg-transparent border-transparent -translate-x-4 opacity-30'
                            }`}>
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 ${item.done ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                                }`}>
                                {item.done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                            </div>
                            <span className={`font-medium ${item.active ? 'text-slate-900' : 'text-slate-500'}`}>
                                {item.text}
                            </span>
                            {item.active && !item.done && <Loader2 className="ml-auto h-4 w-4 text-teal-500 animate-spin" />}
                        </div>
                    );
                })}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden max-w-sm">
                <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default Step4AIAnalysis;
