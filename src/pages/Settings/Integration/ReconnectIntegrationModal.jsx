import React, {
    useState,
    useEffect,
    useMemo,
} from "react";

import { X } from "lucide-react";

import StepForm from "../../../components/integration-wizard/components/StepForm";
import StepVerify from "../../../components/integration-wizard/components/StepVerify";

import "./ReconnectIntegrationModal.css";

const ReconnectIntegrationModal = ({ isOpen, onClose, integration, onSuccess,}) => {

    const [step, setStep] = useState("form");
    const [data, setData] = useState({});

    /*
    =========================================
    RESET + PREFILL
    =========================================
    */

    useEffect(() => {

        if (isOpen && integration) {

            setStep("form");
            setData(integration.metadata || {});
        }

    }, [isOpen, integration]);

    /*
    =========================================
    PARSE CONFIG SCHEMA
    =========================================
    */

    const parsedSchema =useMemo(() => {

            try {
                return JSON.parse(integration?.configSchema ||"{}");
            } catch (error) {
                console.error("Failed to parse config schema:",error);
                return { fields: [], };
            }

        }, [integration]);

    /*
    =========================================
    FIELD MAPPING
    =========================================
    */

    const fields = useMemo(() => {

            return (parsedSchema?.fields || []).map((field) => ({

                name:field.name,
                label:field.label,
                type:field.type ||"text",
                placeholder:`Enter ${field.label}`,
                required:field.required || false,
            }));

        }, [parsedSchema]);

    /*
    =========================================
    UPDATE FORM DATA
    =========================================
    */

    const updateData = (updatedFields) => {

        setData((prev) => ({
            ...prev,
            ...updatedFields,
        }));
    };

    /*
    =========================================
    VALIDATION
    =========================================
    */

    const handleNext = () => {

        const missingField = fields.find(
            (field) => field.required && !data[field.name]
        );

        if (missingField) {

            alert(`${missingField.label} is required`);

            return;
        }

        setStep("verify");
    };

    /*
    =========================================
    EXIT
    =========================================
    */

    if (!isOpen || !integration) {
        return null;
    }

    const provider = integration.service.toLowerCase();


    return (

        <div className="integration-reconnect-modal-overlay">
            <div className="integration-reconnect-modal">
                <div className="integration-reconnect-header">

                    <div className="integration-reconnect-title">

                        <img
                            src={integration.icon}
                            alt={
                                integration.displayName
                            }
                        />

                        <div>

                            <h2>
                                Reconnect Integration
                            </h2>

                            <p>
                                {
                                    integration.displayName
                                }
                            </p>

                        </div>

                    </div>

                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                    >

                        <X size={18} />

                    </button>

                </div>


                <div className="integration-reconnect-body">

                    {
                        step === "form" ? (

                            <StepForm
                                provider={provider}
                                fields={fields}
                                data={data}
                                updateData={updateData}
                            />

                        ) : (

                            <StepVerify
                                provider={provider}
                                data={data}
                                reconnectMode={true}
                                onSuccess={() => {

                                    onSuccess?.();

                                    onClose();
                                }}
                            />
                        )
                    }

                </div>


                {
                    step === "form" && (

                        <div
                            className="wizard-footer"
                            style={{
                                padding:
                                    "1.5rem 2rem",

                                display: "flex",

                                justifyContent:
                                    "flex-end",

                                gap: "1rem",

                                borderTop:
                                    "1px solid rgba(255,255,255,0.06)",
                            }}
                        >

                            <button
                                className="btn-secondary btn-integ"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn-primary btn-integ"
                                onClick={handleNext}
                            >
                                Continue Verification
                            </button>

                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default ReconnectIntegrationModal;