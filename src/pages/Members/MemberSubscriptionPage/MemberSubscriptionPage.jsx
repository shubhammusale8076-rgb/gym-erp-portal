import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CreditCard, Pause, XCircle, ArrowLeft, Calendar, Clock, Hourglass, Star, Zap, MessageSquare, Bell} from "lucide-react";

import "./MemberSubscription.css";

import KpiCard from "../../../components/KpiCard/KpiCard";
import { getMembershipByMemberId } from "../../../apiservice/apiservice";
import FreezeMembershipModal from "./FreezeMembershipModal/FreezeMembershipModal";
import WhatsAppActionButton from "../../../components/Communication/WhatsAppActionButton";
import CommunicationActionsCard from "../../../components/Communication/CommunicationActionsCard";

const MemberSubscriptionPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showFreezeModal, setShowFreezeModal] = useState(false);

    const fetchData = async () => {
        try {

            setLoading(true);

            const response = await getMembershipByMemberId(id);

            setData(response);

        } catch (error) {

            console.error("Error:", error.response || error.message);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const getInitials = (name) => {

        if (!name) return "";

        const parts = name.trim().split(" ");

        if (parts.length === 1) {
            return parts[0][0].toUpperCase();
        }

        return (
            parts[0][0] + parts[parts.length - 1][0]
        ).toUpperCase();
    };

    const formatDate = (dateString) => {

        if (!dateString) return "-";

        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatCycle = (cycle) => {

        if (!cycle) return "-";

        const [startDate, endDate] = cycle.split(" - ");

        const format = (dateString) =>
            new Date(dateString).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });

        return `${format(startDate)} - ${format(endDate)}`;
    };

    if (loading) {
        return <div className="subscription-loading">Loading...</div>;
    }

    if (!data) {
        return <div className="subscription-loading">No data found.</div>;
    }

    const {
        member,
        currentSubscription,
        history = [],
        loyalty,
        paymentMethod
    } = data;

    const subscriptionCode = data?.code;

    const hasActiveSubscription = subscriptionCode === "ACTIVE_SUBSCRIPTION_FOUND";

    const hasNoSubscription = subscriptionCode === "NO_ACTIVE_SUBSCRIPTION";

    const isExpiredSubscription = currentSubscription?.status === "EXPIRED";

    return (

        <div className="subscription-page">

            {/* BACK BUTTON */}

            <button
                className="back-link"
                onClick={() => navigate(`/members/${id}`)}
            >
                <ArrowLeft size={14} />
                BACK TO DIRECTORY
            </button>

            {/* HEADER */}

            <div className="sub-header">

                <div className="sub-user-profile">

                    <div className="profile-avatar">

                        {member?.profileImageUrl ? (

                            <img
                                src={member.profileImageUrl}
                                alt={member.fullName}
                            />

                        ) : (

                            <div className="initials">
                                {getInitials(member?.fullName)}
                            </div>
                        )}
                    </div>

                    <div className="profile-info">

                        <div className="member-id-row">

                            <h1>{member?.fullName}</h1>

                            <span
                                className={`status-badge ${
                                    hasActiveSubscription
                                        ? "active"
                                        : isExpiredSubscription
                                            ? "expired"
                                            : "inactive"
                                }`}
                            >
                                {hasActiveSubscription
                                    ? "ACTIVE"
                                    : isExpiredSubscription
                                        ? "EXPIRED"
                                        : "NO MEMBERSHIP"}
                            </span>

                        </div>

                        <p>{member?.email}</p>

                    </div>
                </div>

                {/* HEADER ACTIONS */}

                <div className="header-actions">

                    {hasActiveSubscription ? (
                        <>
                            <button
                                className="action-btn btn-freeze"
                                onClick={() => setShowFreezeModal(true)}
                            >
                                <Pause size={14} />
                                Freeze Membership
                            </button>

                            <button className="action-btn btn-cancel">
                                <XCircle size={14} />
                                Cancel Membership
                            </button>
                        </>
                    ) : (
                        <button className="action-btn btn-primary">
                            Activate Membership
                        </button>
                    )}

                </div>
            </div>

            {/* KPI CARDS */}

            <div style={{ display: "grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", margin: "32px 0"}}>
                <KpiCard title="Current Plan" value={currentSubscription?.planName ||"No Active Plan"} theme="blue" Icon={Zap} />
                <KpiCard title="Start Date" value={formatDate(currentSubscription?.startDate)} theme="purple" Icon={Calendar}/>
                <KpiCard title="End Date" value={formatDate(currentSubscription?.endDate)} theme="orange" Icon={Clock}/>
                <KpiCard title="Remaining Days" value={hasActiveSubscription ? currentSubscription?.remainingDays : "N/A"} theme="teal" Icon={Hourglass}/>

            </div>

            <div className="main-content-grid">

                <div className="left-column">


                    {hasNoSubscription && (

                        <div className="card empty-membership-card">

                            <div className="empty-membership-content">

                                <h2 className="card-title">No Active Membership</h2>

                                <p className="card-description"> This member currently does not have an active subscription. Activate a membership plan to access gym facilities and premium services.</p>

                                <button className="btn-primary">
                                    Activate Membership
                                </button>

                            </div>
                        </div>
                    )}

                    {/* SUBSCRIPTION DETAILS */}

                    {hasActiveSubscription && (

                        <div className="card">

                            <h2 className="card-title">
                                Subscription Details
                            </h2>

                            <div className="details-grid">

                                <div className="detail-item">
                                    <label>PLAN INFORMATION</label>
                                    <p>
                                        {currentSubscription?.planName || "-"} Plan
                                    </p>
                                </div>

                                <div className="detail-item">
                                    <label>DURATION</label>
                                    <p>
                                        {currentSubscription?.duration || "-"}
                                    </p>
                                </div>

                                <div className="detail-item">
                                    <label>PAYMENT STATUS</label>

                                    <div className="payment-status-row">

                                        <div className="status-dot"></div>

                                        <p>
                                            {currentSubscription?.paymentStatus || "-"}
                                        </p>

                                    </div>
                                </div>

                                <div className="auto-renew-box">

                                    <div className="auto-renew-info">
                                        <label>AUTO RENEW</label>
                                    </div>

                                    <div className="toggle-switch"></div>

                                </div>

                            </div>
                        </div>
                    )}

                    {/* HISTORY */}

                    <div className="past-subscriptions">

                        <div className="section-header">

                            <h2>Past Subscriptions</h2>

                            <button
                                href="#"
                                className="download-link"
                            >
                                Download Invoices
                            </button>

                        </div>

                        <div className="card history-card">

                            <table className="history-table">

                                <thead>
                                    <tr>
                                        <th>PLAN NAME</th>
                                        <th>CYCLE</th>
                                        <th>AMOUNT</th>
                                        <th>STATUS</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {history?.length > 0 ? (

                                        history.map((h) => (

                                            <tr key={h.id}>

                                                <td>{h.planName}</td>

                                                <td>
                                                    <div className="cycle-text">
                                                        {formatCycle(h.cycle)}
                                                    </div>
                                                </td>

                                                <td>{h.amount}</td>

                                                <td>
                                                    <span className="status-tag">
                                                        {h.status}
                                                    </span>
                                                </td>

                                            </tr>
                                        ))

                                    ) : (

                                        <tr>
                                            <td colSpan="4">
                                                No subscription history found.
                                            </td>
                                        </tr>
                                    )}

                                </tbody>

                            </table>

                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}

                <div className="right-column">

                    {/* LOYALTY */}

                    <div className="card loyalty-card">

                        <div className="loyalty-header">

                            <div>

                                <span className="loyalty-label">
                                    LOYALTY STATUS
                                </span>

                                <h3 className="loyalty-title">
                                    {loyalty?.status || "-"}
                                </h3>

                            </div>

                            <Star
                                size={32}
                                className="star-icon"
                            />

                        </div>

                        <p className="loyalty-desc">

                            Member since {loyalty?.memberSince || "-"}.

                            {" "}

                            {loyalty?.stats || ""}

                        </p>

                        <div className="loyalty-progress-container">

                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${loyalty?.progress || 0}%`
                                    }}
                                ></div>

                            </div>

                            <span className="next-milestone">
                                {loyalty?.nextMilestone || "-"}
                            </span>

                        </div>
                    </div>

                    {/* PAYMENT METHOD */}

                    <div className="card payment-card">

                        <span className="card-label">
                            PAYMENT METHOD
                        </span>

                        <div className="card-item">

                            <div className="card-icon">
                                <CreditCard size={20} />
                            </div>

                            <div className="card-details">

                                <p>
                                    {paymentMethod?.type || "No Card"} ••••
                                    {" "}
                                    {paymentMethod?.last4 || "----"}
                                </p>

                                <span>
                                    Expires {paymentMethod?.expiry || "--/--"}
                                </span>

                            </div>
                        </div>

                        <button className="btn-primary">
                            Update Card
                        </button>

                    </div>

                    {/* FACILITY PERKS */}

                    <div className="perks-card">

                        <div className="perks-bg"></div>

                        <h3>
                            View Premium Facility Perks & Schedule
                        </h3>

                    </div>

                    {/* COMMUNICATION */}

                    {hasActiveSubscription && (

                        <div
                            className="subscription-communication-card card"
                            style={{ marginTop: "24px" }}
                        >

                            <CommunicationActionsCard
                                title="Subscription Communication"
                                description="Send automated renewal reminders or expiry warnings directly via WhatsApp."
                            >

                                <WhatsAppActionButton
                                    label="Send Renewal Reminder"
                                    icon={MessageSquare}
                                    eventType="RENEWAL_REMINDER"
                                    payload={{
                                        subscriptionId:
                                            currentSubscription?.id
                                    }}
                                    variant="primary"
                                />

                                <WhatsAppActionButton
                                    label="Send Expiry Warning"
                                    icon={Bell}
                                    eventType="EXPIRY_WARNING"
                                    payload={{
                                        subscriptionId:
                                            currentSubscription?.id
                                    }}
                                    variant="secondary"
                                />

                            </CommunicationActionsCard>

                        </div>
                    )}

                </div>
            </div>

            {/* FREEZE MODAL */}

            <FreezeMembershipModal
                open={showFreezeModal}
                onClose={() => setShowFreezeModal(false)}
                subscriptionId={currentSubscription?.id}
            />

        </div>
    );
};

export default MemberSubscriptionPage;