import { getToken } from '../../utils/auth';
import React, { useEffect, useState } from 'react';
import {
    User,
    Upload,
    Tag,
    ArrowRight,
    Camera,
    X,
    Phone
} from 'lucide-react';

import './AddMember.css';

import {
    deleteProfileImage,
    getPlanList,
    uploadProfileImage
} from '../../apiservice/apiservice';

import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/toastSlice';

const AddMember = ({ onClose, onAdd, onUpdate, member = null }) => {

    const token = getToken();
    const dispatch = useDispatch();

    const isEditMode = !!member;

    const [formData, setFormData] = useState({
        fullName: member?.fullName || '',
        email: member?.email || '',
        phoneNumber: member?.phoneNumber || '',
        password: '',
        aadhaarNumber: member?.aadhaarNumber || '',
        planId: member?.planId || '',
        address: member?.address || '',
        emergencyContactName: member?.emergencyContactName || '',
        emergencyContactNumber: member?.emergencyContactNumber || '',
        durationInDays: member?.durationInDays || '',
    });

    const [plans, setPlans] = useState([]);

    const [profileImageUrl, setProfileImageUrl] = useState(
        member?.profileImageUrl || ''
    );

    const [profileImagePublicId, setProfileImagePublicId] = useState(
        member?.profileImagePublicId || ''
    );

    const [uploading, setUploading] = useState(false);

    const fetchAllPlans = async () => {
        try {
            const response = await getPlanList(token);
            setPlans(response);
        } catch (error) {
            console.error('Error:', error.response || error.message);
        }
    };

    useEffect(() => {
        fetchAllPlans();
    }, []);

    const handleImageUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        try {

            setUploading(true);

            const data = await uploadProfileImage(
                file,
                "MEMBER"
            );

            const isExistingImage =
                profileImagePublicId &&
                profileImagePublicId !== member?.profileImagePublicId;

            if (isExistingImage) {
                await deleteProfileImage(profileImagePublicId, token);
            }

            dispatch(
                showToast({
                    message: data.message,
                    type: "success"
                })
            );

            setProfileImageUrl(data.url);
            setProfileImagePublicId(data.publicId);

        } catch (err) {

            console.error(err);

            dispatch(
                showToast({
                    message: "Image upload failed",
                    type: "error"
                })
            );

        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = async () => {

        try {

            if (profileImagePublicId) {
                await deleteProfileImage(profileImagePublicId, token);
            }

            setProfileImageUrl('');
            setProfileImagePublicId('');

        } catch (err) {
            console.error(err);
        }
    };

    const handleClose = async () => {

        const isNewUploadedImage =
            profileImagePublicId &&
            profileImagePublicId !== member?.profileImagePublicId;

        if (isNewUploadedImage) {
            await deleteProfileImage(profileImagePublicId, token);
        }

        onClose();
    };

    const formatIndianPhoneNumber = (phone) => {

    if (!phone) return '';

    // Remove spaces/dashes/etc
    let cleaned = phone.replace(/\D/g, '');

    // Remove leading 0
    if (cleaned.startsWith('0')) {
        cleaned = cleaned.substring(1);
    }

    // Remove existing 91 if user entered
    if (cleaned.startsWith('91') && cleaned.length > 10) {
        cleaned = cleaned.substring(2);
    }

    // Final Indian format
    return `91${cleaned}`;
};

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData.planId) {
            alert("Please select a membership plan");
            return;
        }

        if (!formData.durationInDays) {
            alert("Please select duration");
            return;
        }

        if (
            formData.aadhaarNumber &&
            formData.aadhaarNumber.length !== 12
        ) {
            alert("Aadhaar must be 12 digits");
            return;
        }

        const payload = {
            fullName: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            phoneNumber: formatIndianPhoneNumber(formData.phoneNumber),
            aadhaarNumber: formData.aadhaarNumber,
            address: formData.address,
            emergencyContactName: formData.emergencyContactName,
            emergencyContactNumber: formData.emergencyContactNumber,
            planId: formData.planId,
            durationInDays: formData.durationInDays,
            profileImageUrl: profileImageUrl || null,
            profileImagePublicId: profileImagePublicId || null,
        };

        if (isEditMode) {
            payload.password = formData.password;
        }

        if (isEditMode) {

            onUpdate({
                ...payload,
                id: member.id
            });

        } else {

            onAdd(payload);
        }
    };

    const handlePlanSelect = (planId) => {
        setFormData({
            ...formData,
            planId
        });
    };

    const handleDurationSelect = (days) => {
        setFormData({
            ...formData,
            durationInDays: days
        });
    };

    return (
        <div className="am-overlay">

            <div className="am-modal">

                <header className="am-header">

                    <span className="am-subtitle">
                        MEMBER CURATOR
                    </span>

                    <h1 className="am-title">
                        {isEditMode
                            ? 'Update Member'
                            : 'Add New Member'}
                    </h1>

                    <p className="am-desc">
                        {isEditMode
                            ? 'Update member information and membership details.'
                            : 'Onboard a new athlete into the Elite Club ecosystem.'}
                    </p>

                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={handleClose}
                    >
                        <X size={30} />
                    </button>

                </header>

                <form
                    className="am-grid"
                    onSubmit={handleSubmit}
                >

                    <div className="am-col">

                        <div className="am-card card">

                            <div className="am-card-header">
                                <h3 className="am-card-title">
                                    Personal Information
                                </h3>
                                <User size={16} className="icon-purple" />
                            </div>

                            <div className="am-form-grid">

                                <div className="am-form-group">
                                    <label>Full Name</label>

                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        placeholder='Enter Full Name'
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                fullName: e.target.value
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="am-form-group">
                                    <label>Email</label>

                                    <input
                                        type="email"
                                        value={formData.email}
                                        placeholder='Enter Email'
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="am-form-group">
                                    <label>Phone Number</label>

                                    <input
                                        type="tel"
                                        value={formData.phoneNumber}
                                        placeholder='Enter Phone Number'
                                        onChange={(e) => {
                                            const value =
                                                e.target.value.replace(/\D/g, '');

                                            setFormData({
                                                ...formData,
                                                phoneNumber: value
                                            });
                                        }}
                                    />
                                </div>

                                {/* {isEditMode && (
                                    <div className="am-form-group">
                                        <label>Password</label>

                                        <input
                                            type="password"
                                            placeholder='Enter Password'
                                            value={formData.password}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    password: e.target.value
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                )} */}

                                <div className="am-form-group">
                                    <label>Aadhaar Number</label>

                                    <input
                                        type="text"
                                        maxLength={12}
                                        placeholder='Enter Aadhaar Number'
                                        value={formData.aadhaarNumber}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                aadhaarNumber: e.target.value
                                            })
                                        }
                                    />
                                </div>

                            </div>

                            <div className="am-form-group">
                                <label>Address</label>

                                <input
                                    type="text"
                                    placeholder='Enter Address'
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            address: e.target.value
                                        })
                                    }
                                />
                            </div>

                        </div>

                        <div className="am-card card premium-card">

                            <div className="am-card-header mb-8">
                                <h3 className="am-card-title">
                                    Membership Plan
                                </h3>

                                <Tag size={16} className="icon-purple" />
                            </div>

                            <div className="premium-tier-grid">

                                {plans.map(plan => (

                                    <div
                                        key={plan.id}
                                        className={`premium-tier-card ${
                                            formData.planId === plan.id
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            handlePlanSelect(plan.id)
                                        }
                                    >

                                        <h3 className="tier-name">
                                            {plan.name}
                                        </h3>

                                        <div className="tier-price">
                                            <span className="currency">₹</span>

                                            <span className="amount">
                                                {plan.price}
                                            </span>

                                            <span className="period">
                                                /month
                                            </span>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className="am-card card premium-card">

                            <div className="am-card-header">
                                <h3 className="am-card-title">
                                    Select Duration
                                </h3>
                            </div>

                            <div className="premium-duration-grid">

                                {[30, 90, 180, 365].map(days => {

                                    const months =
                                        Math.round(days / 30);

                                    return (

                                        <div
                                            key={days}
                                            className={`premium-duration-card ${
                                                formData.durationInDays === days
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                handleDurationSelect(days)
                                            }
                                        >

                                            <div className="duration-main">

                                                <span className="duration-months">
                                                    {months}
                                                </span>

                                                <span className="duration-label">
                                                    Month{months > 1 ? 's' : ''}
                                                </span>

                                            </div>

                                            <div className="duration-days">
                                                {days} Days
                                            </div>

                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                    </div>

                    <div className="am-col">

                        <div className="am-card card am-profile-card">

                            <h3 className="am-card-title">
                                Profile Portrait
                            </h3>

                            <div className="avatar-upload-area">

                                <div className="avatar-circle">

                                    {profileImageUrl ? (

                                        <img
                                            src={profileImageUrl}
                                            alt="profile"
                                            className="avatar-img"
                                        />

                                    ) : (

                                        <Camera size={48} />

                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="profileUpload"
                                        style={{ display: "none" }}
                                        onChange={handleImageUpload}
                                    />

                                    <label
                                        htmlFor="profileUpload"
                                        className="upload-btn-circle"
                                    >
                                        {uploading
                                            ? "..."
                                            : <Upload size={16} />}
                                    </label>

                                </div>

                            </div>

                            <p className='am-upload-hint'>
                                Recommended: 800x800px high-res portrait.
                            </p>

                            {profileImageUrl && (
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={handleRemoveImage}
                                >
                                    Remove Image
                                </button>
                            )}

                        </div>

                        <div className="am-card card contact-card">

                            <div className="am-card-header">

                                <h3 className="am-card-title">
                                    Emergency Contact
                                </h3>

                                <Phone size={16} className="icon-purple" />

                            </div>

                            <div className="am-form-stack">

                                <input
                                    type="text"
                                    className='pink-input'
                                    placeholder="Contact Name"
                                    value={formData.emergencyContactName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            emergencyContactName: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className='pink-input'
                                    value={formData.emergencyContactNumber}
                                    onChange={(e) => {

                                        const value =
                                            e.target.value.replace(/\D/g, '');

                                        setFormData({
                                            ...formData,
                                            emergencyContactNumber: value
                                        });
                                    }}
                                />

                            </div>

                        </div>

                        <div className="am-actions">

                            <button
                                type="submit"
                                className="am-btn-submit"
                                disabled={!formData.planId}
                            >
                                {isEditMode
                                    ? 'Update Member'
                                    : 'Create Member'}

                                <ArrowRight size={16} />
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddMember;