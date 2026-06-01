import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import './ConfirmationModal.css';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    description = "Are you sure you want to continue?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger", // danger | warning | info
    loading = false,
}) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="confirmation-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className={`confirmation-modal ${variant}`}
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Close */}


                    {/* Icon */}
                    <div className="confirmation-header">
                        <div className={`modal-icon ${variant}`}>
                            <AlertTriangle size={28} />
                        </div>
                        <h2>{title}</h2>
                    </div>

                    {/* Content */}
                    <div className="modal-content">

                        <div className="modal-description">
                            {description}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="modal-actions">
                        <button
                            className="modal-btn secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            {cancelText}
                        </button>

                        <button
                            className={`modal-btn primary ${variant}`}
                            onClick={onConfirm}
                            disabled={loading}
                        >
                            {loading ? "Please wait..." : confirmText}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ConfirmationModal;