import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { validateEmail } from '../../utils/validation';
import api from '../../Api';

export default function ForgotPassword({ setView }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!validateEmail(email)) {
            return setError('Please enter a valid email address');
        }

        setLoading(true);
        try {
            // Endpoint to hit the django backend forgot-password
            const res = await api.post('/api/forgot-password/', { email });
            console.log('Forgot Password Request Success:', res.data);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || err.response?.data?.message || 'Error processing request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
        >
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h2>
                <p className="text-slate-500">Enter your email to receive recovery instructions</p>
            </div>

            {success ? (
                <div className="text-center space-y-6">
                    <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
                        A password reset link has been sent to your email address.
                    </div>
                    <button
                        onClick={() => setView('login')}
                        className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors flex items-center justify-center gap-2 w-full"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Sign In
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-10 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl py-3 font-medium transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                Send Instructions
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            )}

            {!success && (
                <div className="mt-8 text-center">
                    <button
                        onClick={() => setView('login')}
                        className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Sign In
                    </button>
                </div>
            )}
        </motion.div>
    );
}
