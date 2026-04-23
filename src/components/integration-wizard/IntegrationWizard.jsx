import React from "react";
import { useWizard } from "./useWizard";

import "./style.css";
import { useParams } from "react-router-dom";
import StepGuide from "./components/StepGuide";
import StepForm from "./components/StepForm";
import StepVerify from "./components/StepVerify";
import StepSuccess from "./components/StepSuccess";
import WehbookConfig from "./components/WehbookConfig";

const IntegrationWizard = () => {
    const { provider } = useParams();

    const steps = [
        { type: "guide" },
        { type: "form" },
        { type: "webhook" },
        { type: "verify" },
        { type: "success" }
    ];

    const wizard = useWizard(steps);

    const getSteps = () => {
        if (provider === "razorpay") {
            return [
                {
                    title: "Get API Keys",
                    type: "info",
                    description: "Login → Settings → API Keys",
                    link: "https://dashboard.razorpay.com"
                },
                {
                    title: "Enter Details",
                    type: "form",
                    fields: [
                        { name: "keyId", label: "Key ID" },
                        { name: "keySecret", label: "Key Secret", type: "password" },
                        { name: "webhookSecret", label: "Webhook Secret", type: "password" }
                    ],
                    validate: (data) => {
                        if (!data.keyId || !data.keySecret) {
                            return "All fields are required";
                        }
                    }
                }
            ];
        }

        if (provider === "whatsapp") {
            return [
                {
                    title: "Get Credentials",
                    type: "info",
                    description: "Go to Meta Dashboard → WhatsApp API",
                    link: "https://developers.facebook.com"
                },
                {
                    title: "Enter Details",
                    type: "form",
                    fields: [
                        { name: "accessToken", label: "Access Token" },
                        { name: "phoneNumberId", label: "Phone Number ID" }
                    ]
                }
            ];
        }

        return [];
    };

    const handleSubmit = async (data) => {

        // await fetch("/api/integrations/connect", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify({
        //     tenantId: "your-tenant-id",
        //     provider: provider.toUpperCase(),
        //     config: data
        //   })
        // });

        // ✅ Redirect after success
        // navigate("/integrations");
    };

    const renderStep = () => {
        switch (wizard.step.type) {
            case "guide":
                return <StepGuide provider={provider} />;

            case "form":
                return (
                    <StepForm
                        data={wizard.data}
                        updateData={wizard.updateData}
                    />
                );

            case "webhook":
                return (
                    <WehbookConfig
                        data={wizard.data}
                        onSuccess={wizard.next}
                    />
                );

            case "verify":
                return (
                    <StepVerify
                        data={wizard.data}
                        onSuccess={wizard.next}
                    />
                );

            case "success":
                return <StepSuccess provider={provider} />;

            default:
                return null;
        }
    };


    return (
        <div className="wizard">

            <div className="wizard-header">
                <h2>Connect {provider}</h2>
                <div>
                    Step {wizard.stepIndex + 1} of {steps.length}
                </div>
            </div>

            <div className="wizard-body">
                {renderStep()}
            </div>

            {wizard.step.type !== "success" && (
                <div className="wizard-footer">
                    <button onClick={wizard.back} disabled={wizard.isFirst}>
                        Back
                    </button>

                    <button
                        onClick={() => {
                            if (wizard.step.type === "form") {
                                if (!wizard.data.key || !wizard.data.secret) {
                                    alert("Please fill all fields");
                                    return;
                                }
                            }
                            wizard.next();
                        }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default IntegrationWizard;