import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedPageProps {
    children: ReactNode;
    className?: string;
}

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.35,
};

export default function AnimatedPage({ children, className = '' }: AnimatedPageProps) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className={className}
        >
            {children}
        </motion.div>
    );
}
