import React from "react";
import { useParams } from "react-router-dom";

import { useWizard } from "./useWizard";

import "./style.css";

import StepGuide from "./components/StepGuide";
import StepForm from "./components/StepForm";
import StepVerify from "./components/StepVerify";
import StepSuccess from "./components/StepSuccess";
import WehbookConfig from "./components/WehbookConfig";

const PROVIDER_CONFIG = {
    razorpay: {
        displayName: "Razorpay",

        guide: {
            title: "Get API Keys",
            description: "Login → Settings → API Keys",
            link: "https://dashboard.razorpay.com",
        },

        fields: [
            {
                name: "keyId",
                label: "Razorpay Key ID",
                type: "text",
                placeholder: "Enter Razorpay Key ID",
                required: true,
            },
            {
                name: "keySecret",
                label: "Razorpay Key Secret",
                type: "password",
                placeholder: "Enter Razorpay Key Secret",
                required: true,
            },
            {
                name: "webhookSecret",
                label: "Webhook Secret",
                type: "text",
                placeholder: "Enter Webhook Secret",
                required: true,
            },
        ],
    },

    whatsapp: {
        displayName: "WhatsApp",

        guide: {
            title: "Get WhatsApp Credentials",
            description:
                "Go to Meta Dashboard → WhatsApp → API Setup",
            link: "https://developers.facebook.com",
        },

        fields: [
            {
                name: "accessToken",
                label: "Access Token",
                type: "password",
                placeholder: "Enter WhatsApp Access Token",
                required: true,
            },
            {
                name: "phoneNumberId",
                label: "Phone Number ID",
                type: "text",
                placeholder: "Enter Phone Number ID",
                required: true,
            },
            {
                name: "businessAccountId",
                label: "Business Account ID",
                type: "text",
                placeholder: "Enter WhatsApp Business Account ID",
                required: true,
            },
            {
                name: "webhookVerifyToken",
                label: "Webhook Verify Token",
                type: "password",
                placeholder: "Enter Verify Token",
                required: true,
            },
        ],
    },
};

const IntegrationWizard = () => {

    const { provider } = useParams();

    const config = PROVIDER_CONFIG[provider];

    const steps = [
        { type: "guide" },
        { type: "form" },
        { type: "webhook" },
        { type: "verify" },
        { type: "success" },
    ];

    const wizard = useWizard(steps);

    const validateForm = () => {

        const missingField = config.fields.find(
            (field) =>
                field.required &&
                !wizard.data[field.name]
        );

        if (missingField) {
            alert(`${missingField.label} is required`);
            return false;
        }

        return true;
    };

    const handleNext = () => {

        if (wizard.step.type === "form") {

            const isValid = validateForm();

            if (!isValid) {
                return;
            }
        }

        wizard.next();
    };


    const renderStep = () => {

        switch (wizard.step.type) {

            case "guide":
                return (
                    <StepGuide
                        provider={provider}
                        config={config.guide}
                    />
                );

            case "form":
                return (
                    <StepForm
                        provider={provider}
                        fields={config.fields}
                        data={wizard.data}
                        updateData={wizard.updateData}
                    />
                );

            case "webhook":
                return (
                    <WehbookConfig
                        provider={provider}
                        data={wizard.data}
                        updateData={wizard.updateData}
                        onSuccess={wizard.next}
                    />
                );

            case "verify":
                return (
                    <StepVerify
                        provider={provider}
                        data={wizard.data}
                        onSuccess={wizard.next}
                    />
                );

            case "success":
                return (
                    <StepSuccess provider={provider} />
                );

            default:
                return null;
        }
    };

    if (!config) {
        return (
            <div className="wizard">
                Invalid provider configuration
            </div>
        );
    }

    return (
        <div className="wizard">

            <div className="wizard-header">

                <h2>
                    Connect {config.displayName}
                </h2>

                <div>
                    Step {wizard.stepIndex + 1} of {steps.length}
                </div>

            </div>

            <div className="wizard-body">
                {renderStep()}
            </div>

            {wizard.step.type !== "success" && (

                <div className="wizard-footer">

                    <button
                        onClick={wizard.back}
                        disabled={wizard.isFirst}
                    >
                        Back
                    </button>

                    <button onClick={handleNext}>
                        {
                            wizard.step.type === "verify"
                                ? "Connect"
                                : "Next"
                        }
                    </button>

                </div>
            )}
        </div>
    );
};

export default IntegrationWizard;