import React from 'react';
import './css/CloseButton.css';
import { AnimatePresence, motion } from 'framer-motion';

const CloseButton = ({ isBack, onClick, color }) => {
    return (
        <button className="close-button" onClick={onClick}>
            <AnimatePresence mode="wait">
                {isBack ? (
                    <motion.span
                        key="arrow-icon"
                        className="arrow-icon"
                        style={{ '--icon-color': color }}
                        initial={{ scale: 0, rotate: 45, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, rotate: -45, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                ) : (
                    <motion.span
                        key="close-icon"
                        className="close-icon"
                        style={{ '--icon-color': color }}
                        initial={{ scale: 0, rotate: -45, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, rotate: 45, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>
        </button>
    );
};

export default CloseButton;
