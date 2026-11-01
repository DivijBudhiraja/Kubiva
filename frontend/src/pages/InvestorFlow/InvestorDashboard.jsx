import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Wallet, TrendingUp, PieChart, ArrowUpRight,
    ShieldCheck, Bell, Search, Filter, ChevronRight, LogOut
} from 'lucide-react';

// Mock Data for Investment Pools
const POOLS = [
    {
        id: 1,
        name: "SaaS High Growth Fund",
        type: "Revenue Based Financing",
        risk: "Moderate",
        apy: "14.5%",
        tvl: "$4.2M",
        duration: "12 Months",
        color: "bg-teal-50 text-teal-600",
        trend: "+0.4%"
    },
    {
        id: 2,
        name: "Blue Chip SME Debt",
        type: "Invoice Discounting",
        risk: "Low",
        apy: "9.2%",
        tvl: "$12.8M",
        duration: "30-90 Days",
        color: "bg-blue-50 text-blue-600",
        trend: "+0.1%"
    },
    {
        id: 3,
        name: "Web3 Infrastructure",
        type: "Venture Debt",
        risk: "High",
        apy: "22.0%",
        tvl: "$1.5M",
        duration: "24 Months",
        color: "bg-purple-50 text-purple-600",
        trend: "+1.2%"
    }
];

const InvestorDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('market'); // market, portfolio
    const [balance, setBalance] = useState(25000); // Mock USDC Balance

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 fixed h-full hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center space-x-2">
                    <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">K</div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">Invest</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('market')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'market' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <TrendingUp className="h-5 w-5" />
                        <span>Marketplace</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('portfolio')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'portfolio' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <PieChart className="h-5 w-5" />
                        <span>My Portfolio</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-all">
                        <Wallet className="h-5 w-5" />
                        <span>Wallet</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button onClick={() => navigate('/')} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium">
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {activeTab === 'market' ? 'Investment Pools' : 'Your Portfolio'}
                        </h1>
                        <p className="text-slate-500">Welcome back, Alex. You have <span className="text-emerald-500 font-bold">${balance.toLocaleString()} USDC</span> available.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 cursor-pointer shadow-sm">
                            <Bell className="h-5 w-5" />
                        </div>
                        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                            AL
                        </div>
                    </div>
                </header>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500 font-medium mb-1">Total Earnings</p>
                            <h3 className="text-2xl font-bold text-slate-900">$4,293.00</h3>
                        </div>
                        <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500 font-medium mb-1">Active Investments</p>
                            <h3 className="text-2xl font-bold text-slate-900">$125,000</h3>
                        </div>
                        <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <PieChart className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500 font-medium mb-1">Net APY</p>
                            <h3 className="text-2xl font-bold text-slate-900">11.4%</h3>
                        </div>
                        <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                {/* Pool Grid */}
                {activeTab === 'market' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {POOLS.map(pool => (
                            <div key={pool.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-xl ${pool.color}`}>
                                            <Wallet className="h-6 w-6" />
                                        </div>
                                        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">{pool.risk} Risk</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{pool.name}</h3>
                                    <p className="text-sm text-slate-500 mb-6">{pool.type}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-slate-50 p-3 rounded-xl">
                                            <p className="text-xs text-slate-400 font-semibold uppercase">APY</p>
                                            <p className="text-lg font-bold text-emerald-600">{pool.apy}</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-xl">
                                            <p className="text-xs text-slate-400 font-semibold uppercase">TVL</p>
                                            <p className="text-lg font-bold text-slate-900">{pool.tvl}</p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                        Deposit USDC <ArrowUpRight className="ml-2 h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default InvestorDashboard;
