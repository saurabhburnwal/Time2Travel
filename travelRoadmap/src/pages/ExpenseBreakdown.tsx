import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, TrendingDown, Building2, Car, Bike, Bus, Train, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useTrip } from '../contexts/TripContext';

const TRANSPORT_MODES = [
    { id: 'car', label: 'Car', ratePerDay: 800, icon: <Car size={18} />, desc: '₹800/day' },
    { id: 'bike', label: 'Bike', ratePerDay: 300, icon: <Bike size={18} />, desc: '₹300/day' },
    { id: 'bus', label: 'Bus', ratePerDay: 150, icon: <Bus size={18} />, desc: '₹150/day' },
    { id: 'train', label: 'Train', ratePerDay: 200, icon: <Train size={18} />, desc: '₹200/day' },
    { id: 'cab', label: 'Cab/Taxi', ratePerDay: 600, icon: <Truck size={18} />, desc: '₹600/day' },
];

export default function ExpenseBreakdown() {
    const { trip, updateTrip } = useTrip();
    const navigate = useNavigate();

    const selectedMode = TRANSPORT_MODES.find(m => m.id === trip.transportMode) ?? TRANSPORT_MODES[0];

    const accommodation = trip.stayType === 'hotel' ? trip.hotelPrice * trip.days : 0;
    const transport = selectedMode.ratePerDay * trip.days;
    const entryFees = 80 * trip.days;

    const expenses = [
        {
            label: 'Accommodation',
            amount: accommodation,
            color: 'from-brand-400 to-brand-600',
            icon: <Building2 size={18} className="text-brand-500" />,
            note: trip.stayType === 'hotel'
                ? `₹${trip.hotelPrice.toLocaleString()}/night × ${trip.days} nights`
                : 'Local host stay (free)',
        },
        {
            label: 'Transport',
            amount: transport,
            color: 'from-ocean-400 to-ocean-600',
            icon: selectedMode.icon,
            note: `${selectedMode.label} · ₹${selectedMode.ratePerDay}/day × ${trip.days} days`,
        },
        {
            label: 'Entry Fees',
            amount: entryFees,
            color: 'from-green-400 to-emerald-600',
            icon: <Car size={18} className="text-green-500" />,
            note: `₹80/day × ${trip.days} days`,
        },
    ];

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const remaining = trip.budget - total;
    const overBudget = remaining < 0;

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-3xl">
                <button onClick={() => navigate('/itinerary')} className="flex items-center gap-2 text-brand-600 mb-6">
                    <ArrowLeft size={18} /> Back to Itinerary
                </button>

                <div className="glass-card p-8">
                    <h1 className="text-3xl font-bold font-display mb-2">
                        Expense <span className="gradient-text">Breakdown</span>
                    </h1>
                    <p className="text-gray-500 mb-8">{trip.destination} · {trip.days} days · {trip.selectedRoadmap?.type}</p>

                    {/* Transport Mode Selector */}
                    <div className="mb-8">
                        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Transport Mode</h2>
                        <div className="flex flex-wrap gap-2">
                            {TRANSPORT_MODES.map(mode => (
                                <button
                                    key={mode.id}
                                    onClick={() => updateTrip({ transportMode: mode.id })}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-medium text-sm transition-all duration-200
                                        ${trip.transportMode === mode.id
                                            ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-md shadow-brand-100'
                                            : 'border-gray-200 bg-white text-gray-600 hover:border-brand-300 hover:bg-brand-50/50'
                                        }`}
                                >
                                    {mode.icon}
                                    <span>{mode.label}</span>
                                    <span className={`text-xs ${trip.transportMode === mode.id ? 'text-brand-500' : 'text-gray-400'}`}>
                                        {mode.desc}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Expense Items */}
                    <div className="space-y-4 mb-8">
                        {expenses.map((exp, i) => (
                            <motion.div
                                key={exp.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-gray-700 flex items-center gap-2">
                                        {exp.icon} {exp.label}
                                    </span>
                                    <span className="text-xl font-bold gradient-text">
                                        {exp.amount === 0 ? 'Free' : `₹${exp.amount.toLocaleString()}`}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mb-2">{exp.note}</p>
                                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: total > 0 ? `${(exp.amount / total) * 100}%` : '0%' }}
                                        transition={{ duration: 0.8, delay: i * 0.1 }}
                                        className={`h-full rounded-full bg-gradient-to-r ${exp.color}`}
                                    />
                                </div>
                                {total > 0 && (
                                    <p className="text-xs text-gray-400 mt-1 text-right">
                                        {Math.round((exp.amount / total) * 100)}% of total
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Total Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className={`rounded-2xl p-6 ${overBudget
                            ? 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200'
                            : 'bg-gradient-to-r from-brand-50 to-ocean-50 border border-brand-100'}`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-bold text-gray-800">Total per Person</span>
                            <span className="text-3xl font-bold gradient-text">₹{total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-3">
                            <span className="text-gray-600">Budget {overBudget ? 'Exceeded' : 'Remaining'}</span>
                            <span className={`font-bold text-lg ${overBudget ? 'text-red-600' : 'text-green-600'}`}>
                                {overBudget ? '- ' : '+ '}₹{Math.abs(remaining).toLocaleString()}
                            </span>
                        </div>
                        <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, (total / trip.budget) * 100)}%` }}
                                transition={{ duration: 1 }}
                                className={`h-full rounded-full ${overBudget
                                    ? 'bg-gradient-to-r from-red-500 to-pink-500'
                                    : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            {Math.round((total / trip.budget) * 100)}% of ₹{trip.budget.toLocaleString()} budget
                        </p>
                    </motion.div>

                    {/* Savings badge for local host */}
                    {trip.stayType === 'host' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                            className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3">
                            <Shield className="text-green-600 flex-shrink-0" size={24} />
                            <p className="text-green-700 font-medium text-sm">
                                You're saving approximately ₹{(trip.hotelPrice * trip.days).toLocaleString()} by staying with a local host!
                            </p>
                        </motion.div>
                    )}

                    {/* Over budget tips */}
                    {overBudget && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                            className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingDown className="text-amber-600" size={20} />
                                <span className="font-bold text-amber-800">Budget Tips</span>
                            </div>
                            <ul className="text-sm text-amber-700 space-y-1">
                                <li>• Switch to a local host stay (free accommodation)</li>
                                <li>• Choose Bike or Bus for cheaper travel</li>
                                <li>• Choose the Budget Efficient roadmap</li>
                                <li>• Reduce travel days or increase your budget</li>
                            </ul>
                            <button onClick={() => navigate('/stay-selection')} className="mt-3 text-sm font-semibold text-amber-700 hover:text-amber-900 underline">
                                → Change Stay Selection
                            </button>
                        </motion.div>
                    )}

                    <div className="flex gap-3 mt-8">
                        <button onClick={() => navigate('/map-view')} className="btn-secondary flex-1 text-center">View Map</button>
                        <button onClick={() => navigate('/final-review')} className="btn-primary flex-1 text-center">Finalize Trip</button>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}
