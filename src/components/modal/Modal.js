import React from "react";
import styles from "../gallery/css/MyGeneratedPhotosList.module.css";
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, children, style, isFirst = true }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={isFirst ? styles.modalOverlay : styles.modalOverlayWithoutBackground}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                >
                    <motion.div
                        style={{
                            paddingTop: window.Telegram.WebApp?.safeAreaInset?.top
                                ? `${window.Telegram.WebApp.safeAreaInset.top * 2}px`
                                : '0'
                        }}
                        className={styles.modalContent}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
