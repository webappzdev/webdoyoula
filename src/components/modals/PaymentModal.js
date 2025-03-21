// PaymentModal.jsx
import React, { useState } from 'react';
import RightModal from "../modal/RightModal";
import "./PaymentModal.css";
import { useAuth } from "../../context/UserContext";
import { useWebSocket } from "../../context/WebSocketContext";
import { motion, AnimatePresence } from "framer-motion";

const PaymentModal = ({ openPaymentModal, setOpenPaymentModal, isRubles = true }) => {
    const { token, userData } = useAuth();
    const { sendData } = useWebSocket();

    const [selectedOption, setSelectedOption] = useState(null);

    const [paymentStep, setPaymentStep] = useState(1);

    const paymentOptions = [
        { id: 1, label: "100 фотографий", rub: 899, stars: 749 },
        { id: 2, label: "300 фотографий", rub: 1499, stars: 1299 },
        { id: 3, label: "500 фотографий", rub: 2549, stars: 2199 },
        { id: 4, label: "1000 фотографий", rub: 4999, stars: 3999 },
    ];

    const modelOption = {
        id: 5,
        label: "Купить модель",
        rub: 399,
        stars: 249
    };

    const handleBuyClick = (option) => {
        if(userData.language_code === 'ru') {
            setSelectedOption(option);
            setPaymentStep(2);
        } else {
            setSelectedOption(option);
            handleConfirmPurchase("XTR");
        }
    };

    const handleConfirmPurchase = (currency) => {
        console.log(selectedOption)
        if (!selectedOption) return;
        sendData({
            action: "purchase_generates",
            data: {
                jwt: token,
                optionId: selectedOption.id,
                currency: currency
            }
        });
        setOpenPaymentModal(false);
        setPaymentStep(1);
    };

    // Нажатие «Назад» (если на 2 шаге)
    const handleBack = () => {
        setPaymentStep(1);
    };

    return (
        <RightModal
            isOpen={openPaymentModal}
            onClose={() => {
                setOpenPaymentModal(false);
                setPaymentStep(1);
            }}
            // Если мы не на первом шаге, показываем кнопку «назад»
            isBackButton={paymentStep > 1}
            onBack={handleBack}
        >
            <div className="payment-modal-content">
                <AnimatePresence mode="wait">
                    {paymentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h2>Пополнение баланса</h2>
                            <div className="payment-plans">
                                {paymentOptions.map((option) => (
                                    <div className="payment-plan" onClick={() => handleBuyClick(option)} key={option.id}>
                                        <div className="plan-label">{option.label}</div>
                                        <div className="plan-price">
                                            {isRubles ? `${option.rub} руб` : `${option.stars} stars`}
                                        </div>
                                        {/*<button*/}
                                        {/*    className="buy-button"*/}
                                        {/*    onClick={() => handleBuyClick(option)}*/}
                                        {/*>*/}
                                        {/*    Купить*/}
                                        {/*</button>*/}
                                    </div>
                                ))}
                            </div>

                            <hr className="divider" />

                            <div className="payment-plans">
                                <div className="payment-plan" onClick={() => handleBuyClick(modelOption)}>
                                    <div className="plan-label">{modelOption.label}</div>
                                    <div className="plan-price">
                                        {isRubles ? `${modelOption.rub} руб` : `${modelOption.stars} stars`}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {paymentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h2>Выберите метод оплаты</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <button
                                    className="buy-button"
                                    onClick={() => handleConfirmPurchase('RUB')}
                                >
                                    Оплатить рублями
                                </button>
                                <button
                                    className="buy-button"
                                    onClick={() => handleConfirmPurchase('XTR')}
                                >
                                    Оплатить звёздами
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </RightModal>
    );
};

export default PaymentModal;
