import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Briefcase, Utensils } from 'lucide-react';

// --- Reusable Card Component ---
const LoginCard = ({ title, description, Icon, buttonText, onClick }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 15 },
        },
    };

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            // Crisp white card against the snow-blue background
            className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-shadow duration-300 flex flex-col items-center text-center group relative overflow-hidden"
        >
            {/* Soft indigo gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Icon container - starts with soothing blue/purple, fills on hover */}
            <div className="w-14 h-14 bg-indigo-50/80 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300 shadow-sm relative z-10">
                <Icon className="w-7 h-7" strokeWidth={1.5} />
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10">{title}</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed flex-grow relative z-10">
                {description}
            </p>

            {/* Button - starts slate, bursts to indigo on hover */}
            <button
                onClick={onClick}
                className="w-full bg-slate-800 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300 relative z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {buttonText}
            </button>
        </motion.div>
    );
};

// --- Main Page Component ---
const CMMSLogin = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const loginOptions = [
        {
            id: 'student',
            title: 'Student Login',
            description: 'View daily menus, book extra meals, apply for leaves/rebates, and manage your account.',
            Icon: GraduationCap,
            buttonText: 'Login as Student',
        },
        {
            id: 'admin',
            title: 'Admin Login',
            description: 'Oversee operations, review analytics, handle rebates, and manage system administration.',
            Icon: Briefcase,
            buttonText: 'Login as Admin',
        }
    ];

    return (
        // Soothing "snow blue" background (slate-50)
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">

            {/* Navigation */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex items-center shadow-sm shadow-slate-100"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-500 p-2 rounded-lg flex items-center justify-center shadow-sm">
                        <Utensils className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight tracking-tight text-slate-900">CMMS</h1>
                        <p className="text-xs text-slate-500 font-medium tracking-wide">Centralized Mess Management System</p>
                    </div>
                </div>
            </motion.nav>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
                <div className="max-w-3xl w-full space-y-12">

                    {/* Header Section */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                            Centralized Mess <br className="hidden md:block" /> Management System
                        </h2>
                        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                            Digitizing mess operations by streamlining menu planning, extra meal bookings, rebate management, and comprehensive analytics.
                        </p>
                    </motion.div>

                    {/* Login Cards Container */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto"
                    >
                        {loginOptions.map((option) => (
                            <LoginCard
                                key={option.id}
                                title={option.title}
                                description={option.description}
                                Icon={option.Icon}
                                buttonText={option.buttonText}
                                onClick={() => navigate('/login', { state: { role: option.id } })}
                            />
                        ))}
                    </motion.div>

                </div>
            </main>
        </div>
    );
};

export default CMMSLogin;