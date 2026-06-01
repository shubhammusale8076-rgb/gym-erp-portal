import { getToken, getUserId, getRole } from '../../../utils/auth';
import React, { useEffect, useState } from "react";
import {
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    Clock,
    CreditCard,
    MoreHorizontal,
    UserPlus,
    CheckCircle,
    CircleAlert,
    Trash2
} from "lucide-react";
import "./MembershipManagement.css";
import KpiCard from "../../../components/KpiCard/KpiCard";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useNavigate } from "react-router-dom";
import { getMembershipList } from "../../../apiservice/apiservice";

const MembershipManagement = () => {    
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [memberships, setMemberships] = useState([]);
    const token = getToken();

    const getAllMemberships = async()=>{
        try {
            const response = await getMembershipList(token);
            setMemberships(response);
        } catch (error) {
            console.error('Error:', error.response || error.message);
            throw error;
        }
    }

    useEffect(() => {
        getAllMemberships();
    }, [token]);

    // 🔥 Dummy data (we’ll replace with API later)


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


    return (
        <div className="membership-page">

            <PageHeader
                title="Membership Management"
                subtitle="Curate your community. Monitor active memberships, upcoming renewals, and financial vitals from a single, refined vantage point."
                actions={[]}
            />

            {/* 🔥 KPI SECTION */}
            <div className="membership-kpi-grid">
                <KpiCard title="Active Memberships" value="142" theme="blue" Icon={CheckCircle2} />
                <KpiCard title="Expiring Soon" value="18" theme="orange" Icon={Clock} />
                <KpiCard title="Revenue This Month" value="₹1,24,000" theme="purple" Icon={CreditCard} />
                <KpiCard title="Pending Payments" value="9" theme="teal" Icon={XCircle} />
            </div>

            {/* 🔥 FILTERS */}
            <div className="membership-filters">

                <div className="search-bar-wrapper">
                    <Search size={18} className="search-icon-inline" />
                    <input
                        type="text"
                        placeholder="Search members by name or email..."
                        className="search-input-pill"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            // setCurrentPage(1); 
                        }}
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                >
                    <option value="ALL">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="PENDING">Pending</option>
                    <option value="EXPIRED">Expired</option>
                    <option value="PAUSED">Paused</option>
                </select>

            </div>

            {/* 🔥 TABLE */}
            <div className="table-container-wrapper">
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Member</th>
                            <th>Plan</th>
                            <th>Status</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Remaining</th>
                            <th>Payment</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {memberships.map((m) => (
                            <tr key={m.memberId}>

                                <td className="member-info-col">
                                    {m.profileImageUrl ? (
                                        <img src={m.profileImageUrl} alt={m.memberName} className="member-avatar" />
                                    ) : (
                                        <div className="member-initials">
                                            {getInitials(m.memberName)}
                                        </div>
                                    )}
                                    <div className="name-details">
                                        <p className="name" onClick={() => navigate(`/members/${m.memberId}/subscription`)}>{m.memberName}</p>
                                        <p className="email">{m.memberEmail}</p>
                                    </div>

                                </td>

                                <td>{m.planName}</td>

                                <td>
                                    <span className={`status-badge ${m.status.toLowerCase()}`}>
                                        {m.status}
                                    </span>
                                </td>

                                <td>{m.startDate || "-"}</td>
                                <td>{m.endDate || "-"}</td>

                                <td>
                                    {m.remainingDays > 0
                                        ? `${m.remainingDays} days`
                                        : "-"}
                                </td>

                                <td>
                                    <div className={`payment-badge ${m.paymentStatus.toLowerCase()}`}>
                                        {m.paymentStatus === "PAID" ?
                                            <><CheckCircle size={14} /> {m.paymentStatus}</> :
                                            <><CircleAlert size={14} /> {m.paymentStatus}</>}
                                    </div>
                                </td>

                                <td>
                                    <button className="btn-secondary">
                                        <Trash2 size={16} />
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>




        </div>
    );
};

export default MembershipManagement;