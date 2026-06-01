import React, { useMemo, useState } from "react";

import {
    Copy,
    Info,
    Check,
    Shield,
} from "lucide-react";

const PROVIDER_WEBHOOK_CONFIG = {

    whatsapp: {

        title: "WhatsApp Webhook Configuration",

        description:
            "Configure Meta WhatsApp webhook events to receive real-time incoming messages, delivery updates, and account notifications.",

        infoTitle: "Why Webhooks Matter",

        infoDescription:
            "WhatsApp webhooks allow your Gym SaaS platform to receive messages, delivery statuses, read receipts, and automation events instantly from Meta.",

        setupSteps: [
            {
                title: "Copy Callback URL",
                description:
                    "Copy the generated webhook endpoint below.",
            },
            {
                title: "Configure Meta Webhook",
                description:
                    "Paste this URL into Meta Developer Dashboard webhook settings.",
            },
            {
                title: "Subscribe To Events",
                description:
                    "Enable WhatsApp events like messages and message status updates.",
            },
        ],

        triggers: [
            {
                key: "messages",
                title: "Incoming Messages",
                description:
                    "Receive customer messages in real time.",
                defaultChecked: true,
            },
            {
                key: "message_status",
                title: "Message Status",
                description:
                    "Track delivered, read, and failed messages.",
                defaultChecked: true,
            },
            {
                key: "message_template_status",
                title: "Template Status",
                description:
                    "Receive template approval and rejection updates.",
                defaultChecked: false,
            },
            {
                key: "phone_number_name_update",
                title: "Phone Profile Updates",
                description:
                    "Detect changes in WhatsApp business profile.",
                defaultChecked: false,
            },
        ],
    },

    razorpay: {

        title: "Razorpay Webhook Configuration",

        description:
            "Configure Razorpay payment events for real-time transaction synchronization.",

        infoTitle: "Why Webhooks Matter",

        infoDescription:
            "Webhook events help synchronize payments, subscriptions, invoices, and refunds instantly with your Gym SaaS platform.",

        setupSteps: [
            {
                title: "Copy Endpoint URL",
                description:
                    "Copy the secure webhook endpoint generated below.",
            },
            {
                title: "Configure Razorpay Dashboard",
                description:
                    "Add this webhook URL inside Razorpay webhook settings.",
            },
            {
                title: "Select Payment Events",
                description:
                    "Choose which Razorpay events should trigger notifications.",
            },
        ],

        triggers: [
            {
                key: "payment.captured",
                title: "Payment Captured",
                description:
                    "Triggered after successful payment capture.",
                defaultChecked: true,
            },
            {
                key: "payment.failed",
                title: "Payment Failed",
                description:
                    "Triggered when a payment attempt fails.",
                defaultChecked: true,
            },
            {
                key: "subscription.cancelled",
                title: "Subscription Cancelled",
                description:
                    "Detect cancelled recurring subscriptions.",
                defaultChecked: false,
            },
            {
                key: "refund.processed",
                title: "Refund Processed",
                description:
                    "Receive refund completion updates.",
                defaultChecked: false,
            },
        ],
    },
};

function WehbookConfig({ provider, data, updateData,}) {

    const config = PROVIDER_WEBHOOK_CONFIG[provider];

    const [copied, setCopied] = useState(false);

    const [signingEnabled, setSigningEnabled] = useState(false);


    const selectedTriggers =data?.webhookTriggers || [];

    const handleCopy = () => {

        navigator.clipboard.writeText(
            data?.webhookSecret
        );

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const handleTriggerToggle = (key) => {

        const exists =
            selectedTriggers.includes(key);

        const updated = exists
            ? selectedTriggers.filter(
                  (item) => item !== key
              )
            : [...selectedTriggers, key];

        updateData({
            webhookTriggers: updated,
        });
    };

    const handleSelectAll = () => {

        const allKeys = config.triggers.map(
            (trigger) => trigger.key
        );

        updateData({
            webhookTriggers: allKeys,
        });
    };

    return (
        <div className="webhook-config-container">

            <div className="webhook-left-panel">
                <h2 className="guide-title">{config.title}</h2>
                <p className="guide-description">{config.description}</p>
                <div className="info-box">
                    <div className="info-icon"><Info size={18} /></div>
                    <div className="info-content">
                        <h4>{config.infoTitle}</h4>
                        <p>{config.infoDescription}</p>
                    </div>
                </div>

                <div className="guide-steps">

                    {config.setupSteps.map(
                        (step, index) => (
                            <div className="guide-step" key={step.title}>
                                <div className="step-number">{index + 1}</div>
                                <div className="step-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div className="webhook-right-panel">
                <div className="webhook-main-card">
                    <div className="webhook-section">
                        <div className="webhook-card-header">
                            <h4> GENERATED WEBHOOK URL</h4>
                        </div>
                        <div className="webhook-url-box">
                            <span className="url-text"> {data?.webhookSecret}</span>

                            <button className="copy-btn" onClick={handleCopy}>

                                {copied ? (
                                    <Check size={16} />
                                ) : (
                                    <Copy size={16} />
                                )}

                                <span> {copied ? "COPIED" : "COPY"}</span>

                            </button>

                        </div>
                    </div>

                    <div className="webhook-section">

                        <div className="webhook-card-header split-header">

                            <h4>
                                SELECT EVENT TRIGGERS
                            </h4>

                            <button
                                className="text-btn"
                                onClick={handleSelectAll}
                            >
                                Select All
                            </button>

                        </div>

                        <div className="triggers-grid">

                            {config.triggers.map(
                                (trigger) => {

                                    const active =
                                        selectedTriggers.includes(
                                            trigger.key
                                        );

                                    return (
                                        <label
                                            className={`trigger-item ${active ? "active" : ""}`}
                                            key={trigger.key}
                                        >

                                            <input
                                                type="checkbox"
                                                checked={active}
                                                onChange={() =>
                                                    handleTriggerToggle(
                                                        trigger.key
                                                    )
                                                }
                                            />

                                            <div className="trigger-item-content">

                                                <span className="trigger-title">
                                                    {
                                                        trigger.title
                                                    }
                                                </span>

                                                <span className="trigger-desc">
                                                    {
                                                        trigger.description
                                                    }
                                                </span>

                                            </div>

                                        </label>
                                    );
                                }
                            )}

                        </div>
                    </div>
                </div>

                <div className="webhook-card secret-card">

                    <div className="secret-content">

                        <Shield
                            size={20}
                            className="secret-icon"
                        />

                        <div className="secret-text">

                            <h4>
                                Signing Secret
                            </h4>

                            <p>
                                Enable cryptographic
                                request signing for
                                enhanced webhook
                                security.
                            </p>

                        </div>
                    </div>

                    <div className="testi-visibility-toggle large">

                        <button
                            className={`testi-toggle-btn ${
                                signingEnabled
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => {

                                setSigningEnabled(
                                    !signingEnabled
                                );

                                updateData({
                                    signingEnabled:
                                        !signingEnabled,
                                });
                            }}
                        >

                            <div className="testi-toggle-slider" />

                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WehbookConfig;