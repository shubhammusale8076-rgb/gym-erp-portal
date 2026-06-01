import React, { useState } from "react";
import './FreezeMembershipModal.css'

const FreezeMembershipModal = ({ open, onClose, subscriptionId, onSuccess}) => {

    const [formData, setFormData] = useState({
        freezeStartDate: "",
        freezeEndDate: "",
        reason: ""
    });

    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFreeze = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `/api/subscriptions/${subscriptionId}/freeze`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();

            alert(result.message);

            onSuccess();

            onClose();

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="membership-modal">
                <div className="modal-header">
                    <h2>Freeze Membership</h2>
                </div>

                <div className="modal-body">
                    <div className="date-inputs">
                        <div className="form-group">
                            <label>Freeze Start Date</label>
                            <input
                                type="date"
                                name="freezeStartDate"
                                value={formData.freezeStartDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Freeze End Date</label>
                            <input
                                type="date"
                                name="freezeEndDate"
                                value={formData.freezeEndDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Reason</label>

                        <textarea
                            rows={4}
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            placeholder="Medical leave, travel, injury..."
                        />
                    </div>

                </div>

                <div className="modal-footer">

                    <button
                        className="btn-secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn-primary"
                        onClick={handleFreeze}
                        disabled={loading}
                    >
                        {loading
                            ? "Processing..."
                            : "Confirm Freeze"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default FreezeMembershipModal;