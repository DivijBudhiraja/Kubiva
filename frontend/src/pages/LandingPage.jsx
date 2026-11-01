import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Rocket, Building2, User, ArrowRight, ShieldCheck, TrendingUp,
    Wallet, Globe, ChevronDown, CheckCircle2, Zap, Lock
} from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    // Parallax effect for hero
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToProducts = () => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-teal-500 selection:text-white">

            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="h-10 w-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20">K</div>
                        <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>Kubiva</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8 font-medium text-sm text-slate-600">
                        <button onClick={scrollToProducts} className="hover:text-teal-600 transition-colors">Products</button>
                        <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-teal-600 transition-colors">Why Us</button>
                        <button
                            onClick={() => navigate('/investor/dashboard')}
                            className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Investor Login
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <motion.div
                        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-200/30 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[100px]"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 text-center z-10">
                    <motion.div
                        style={{ y: y1, opacity: opacityHero }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/50 border border-slate-200 backdrop-blur-sm mb-8 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
                            <span className="text-sm font-semibold text-slate-600 tracking-wide uppercase">The Future of DeFi Lending</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                            The Financial <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">Super App</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Connect capital to opportunity. Whether you're a startup scaling up or an investor seeking yield, Kubiva bridges the gap with AI & Blockchain.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <button
                                onClick={scrollToProducts}
                                className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:bg-slate-800 transition-all transform hover:-translate-y-1 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center">
                                    Get Funded <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </button>

                            <button
                                onClick={() => navigate('/investor/dashboard')}
                                className="group px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-lg shadow-sm hover:shadow-xl hover:border-teal-500 transition-all transform hover:-translate-y-1 flex items-center"
                            >
                                Start Investing <TrendingUp className="ml-2 h-5 w-5 text-teal-600" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
                    onClick={scrollToProducts}
                >
                    <ChevronDown className="h-10 w-10 text-slate-400 hover:text-slate-600 transition-colors" />
                </motion.div>
            </section>

            {/* Products Section */}
            <section id="products" className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Choose Your Path</h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Tailored financial solutions powered by real-time data analysis.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Startup Card */}
                        <ProductCard
                            title="For Startups"
                            desc="Revenue Based Financing & Venture Debt for high-growth companies."
                            icon={<Rocket className="h-8 w-8 text-teal-600" />}
                            bg="bg-teal-50"
                            border="hover:border-teal-500"
                            onClick={() => navigate('/borrower/startup')}
                            features={['Up to ₹5 Cr Limit', 'Approved in 48 Hrs', 'No Equity Dilution']}
                            delay={0.1}
                        />
                        {/* SME Card */}
                        <ProductCard
                            title="For SMEs"
                            desc="Working capital and invoice discounting for stable businesses."
                            icon={<Building2 className="h-8 w-8 text-indigo-600" />}
                            bg="bg-indigo-50"
                            border="hover:border-indigo-500"
                            onClick={() => navigate('/borrower/business')}
                            features={['GST-based Approval', 'Revolving Credit', 'Competitive Rates']}
                            delay={0.2}
                        />
                        {/* Individual Card */}
                        <ProductCard
                            title="For Individuals"
                            desc="Instant salary advances and personal credit lines."
                            icon={<User className="h-8 w-8 text-rose-600" />}
                            bg="bg-rose-50"
                            border="hover:border-rose-500"
                            onClick={() => navigate('/borrower/individual')}
                            features={['Instant Transfer', 'Flexible Repayment', 'Zero Paperwork']}
                            delay={0.3}
                        />
                    </div>

                    {/* Investor Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 bg-slate-900 rounded-3xl p-12 text-white relative overflow-hidden group cursor-pointer"
                        onClick={() => navigate('/investor/dashboard')}
                    >
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-purple-900/50 to-transparent"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-8 md:mb-0">
                                <div className="inline-block p-3 bg-purple-500/20 rounded-xl mb-6">
                                    <Globe className="h-8 w-8 text-purple-400" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Become an Investor</h3>
                                <p className="text-slate-300 text-lg max-w-xl">Earn superior yields by funding verified borrowers through smart contracts. Start with as little as $100.</p>
                            </div>
                            <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition-colors flex items-center group-hover:scale-105 transform duration-300">
                                View Opportunities <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 bg-slate-50 relative border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Why Kubiva?</h2>
                        <p className="text-xl text-slate-500">Built for the speed of modern finance.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <Feature
                            icon={<Zap className="h-10 w-10 text-amber-500" />}
                            title="Lightning Fast"
                            desc="AI-driven underwriting analyzes data in real-time to provide offers in minutes, not weeks."
                            delay={0.1}
                        />
                        <Feature
                            icon={<Lock className="h-10 w-10 text-teal-500" />}
                            title="Blockchain Secured"
                            desc="All transactions are recorded on-chain for immutable transparency and automated settlements."
                            delay={0.2}
                        />
                        <Feature
                            icon={<ShieldCheck className="h-10 w-10 text-blue-500" />}
                            title="Bank Grade Security"
                            desc="We use AES-256 encryption and partner with regulated entities to ensure your data is safe."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Stats/Trust Section */}
            <section className="py-24 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <Stat number="$50M+" label="Loan Volume" />
                        <Stat number="12k+" label="Active Borrowers" />
                        <Stat number="48h" label="Avg. Approval Time" />
                        <Stat number="0%" label="Hidden Fees" />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center space-x-2 text-white font-bold text-2xl mb-6">
                            <div className="h-8 w-8 bg-teal-600 rounded-lg flex items-center justify-center">K</div>
                            <span>Kubiva</span>
                        </div>
                        <p className="text-sm leading-relaxed">The next generation financial platform connecting ambitious borrowers with global capital.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Products</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="hover:text-white cursor-pointer transition-colors">Startups</li>
                            <li className="hover:text-white cursor-pointer transition-colors">SMEs</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Individuals</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Legal</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li>support@kubiva.finance</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 text-center text-sm">
                    &copy; 2026 Kubiva Finance. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

const ProductCard = ({ title, desc, icon, bg, border, onClick, features, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        onClick={onClick}
        className={`bg-white p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all cursor-pointer group hover:border-transparent relative overflow-hidden`}
    >
        <div className={`absolute inset-0 border-2 border-transparent ${border} rounded-3xl transition-colors pointer-events-none`}></div>
        <div className={`h-16 w-16 ${bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 mb-8 min-h-[50px]">{desc}</p>
        <ul className="space-y-3 mb-8">
            {features.map((f, i) => (
                <li key={i} className="flex items-center text-sm font-medium text-slate-700">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-teal-500" /> {f}
                </li>
            ))}
        </ul>
        <div className="flex items-center font-bold text-slate-900 group-hover:translate-x-2 transition-transform">
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
        </div>
    </motion.div>
);

const Feature = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="text-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-shadow"
    >
        <div className="inline-flex h-20 w-20 bg-slate-50 rounded-full items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{desc}</p>
    </motion.div>
);

const Stat = ({ number, label }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-4"
    >
        <div className="text-4xl cmd:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600 mb-2">{number}</div>
        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</div>
    </motion.div>
);

export default LandingPage;
