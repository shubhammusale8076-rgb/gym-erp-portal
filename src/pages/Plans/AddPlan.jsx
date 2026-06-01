import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import './AddPlan.css';

import {
    DndContext,
    closestCenter
} from '@dnd-kit/core';

import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
    arrayMove
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

const SortableFeature = ({ feature, removeFeature }) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: feature.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="benefit-pill"
        >

            <div
                {...attributes}
                {...listeners}
                className="drag-handle"
            >
                ☰
            </div>

            <div className="hollow-check-icon">
                <Check size={12} strokeWidth={3} />
            </div>

            <span className="benefit-text">
                {feature.text}
            </span>

            <button
                className="remove-benefit-btn"
                onClick={() => removeFeature(feature.id)}
            >
                <X size={14} />
            </button>
        </div>
    );
};

const AddPlan = ({ onClose, onSave, initialData }) => {

    const isEdit = !!initialData;

    const [form, setForm] = useState({
        name: initialData?.name || '',
        price: initialData?.price || 0,
        durationInDays: initialData?.durationInDays || 30,
        sessionLimit: initialData?.sessionLimit || 30,

        personalTrainerIncluded: initialData?.personalTrainerIncluded || false,

        dietPlanIncluded:initialData?.dietPlanIncluded || false,

        badge: initialData?.badge || '',

        isPopular:initialData?.isPopular || false,

        discount:initialData?.discount || 0,

        isActive:initialData?.isActive ?? true,

        features: (initialData?.features || []).map((f) => ({
            id: crypto.randomUUID(),
            text: typeof f === 'string' ? f : f.text
        }))
    });

    const [newFeature, setNewFeature] = useState('');

    const addFeature = () => {

        if (!newFeature.trim()) return;

        setForm(prev => ({
            ...prev,
            features: [
                ...prev.features,
                {
                    id: crypto.randomUUID(),
                    text: newFeature.trim()
                }
            ]
        }));

        setNewFeature('');
    };

    const removeFeature = (id) => {

        setForm(prev => ({
            ...prev,
            features: prev.features.filter(f => f.id !== id)
        }));
    };

    const handleDragEnd = (event) => {

        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex =
            form.features.findIndex(f => f.id === active.id);

        const newIndex =
            form.features.findIndex(f => f.id === over.id);

        setForm(prev => ({
            ...prev,
            features: arrayMove(
                prev.features,
                oldIndex,
                newIndex
            )
        }));
    };

    const handleSubmit = () => {

        const payload = {
            ...form,

            price: Number(form.price),
            durationInDays: Number(form.durationInDays),
            sessionLimit: Number(form.sessionLimit),
            discount: Number(form.discount),

            features: form.features.map(f => f.text)
        };

        onSave(payload);
    };

    return (
        <div
            className="add-plan-overlay"
            onClick={onClose}
        >

            <div
                className="add-plan-modal"
                onClick={(e) => e.stopPropagation()}
            >

                {/* HEADER */}

                <div className="add-plan-header">

                    <div>
                        <h1 className="title">
                            {isEdit
                                ? 'Edit Plan'
                                : 'Create Membership Plan'}
                        </h1>

                        <span className="subtitle">
                            Configure gym membership plan
                        </span>
                    </div>

                    <button
                        className="close-action-btn"
                        onClick={onClose}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* BODY */}

                <div className="add-plan-body">

                    <div className="add-plan-grid">

                        {/* LEFT COLUMN */}

                        <div className="add-plan-col left-col">

                            {/* PLAN NAME */}

                            <div className="input-group">
                                <label className="section-label">
                                    Plan Name
                                </label>

                                <input
                                    type="text"
                                    className="input-pill"
                                    placeholder="Gold Monthly Plan"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value
                                        })
                                    }
                                />
                            </div>

                            {/* BADGE */}

                            <div className="input-group">
                                <label className="section-label">
                                    Badge
                                </label>

                                <input
                                    type="text"
                                    className="input-pill"
                                    placeholder="MOST POPULAR"
                                    value={form.badge}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            badge: e.target.value
                                        })
                                    }
                                />
                            </div>

                            {/* PRICE */}

                            <div className="input-group">
                                <label className="section-label">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    className="input-pill"
                                    placeholder="2499"
                                    value={form.price}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            price: e.target.value
                                        })
                                    }
                                />
                            </div>

                            {/* DURATION */}

                            <div className="input-group">
                                <label className="section-label">
                                    Duration (Days)
                                </label>

                                <input
                                    type="number"
                                    className="input-pill"
                                    placeholder="30"
                                    value={form.durationInDays}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            durationInDays:
                                                e.target.value
                                        })
                                    }
                                />
                            </div>

                            {/* SESSION LIMIT */}

                            <div className="input-group">
                                <label className="section-label">
                                    Session Limit
                                </label>

                                <input
                                    type="number"
                                    className="input-pill"
                                    placeholder="30"
                                    value={form.sessionLimit}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            sessionLimit:
                                                e.target.value
                                        })
                                    }
                                />
                            </div>

                            {/* DISCOUNT */}

                            <div className="input-group">
                                <label className="section-label">
                                    Discount (%)
                                </label>

                                <input
                                    type="number"
                                    className="input-pill"
                                    placeholder="10"
                                    value={form.discount}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            discount:
                                                e.target.value
                                        })
                                    }
                                />
                            </div>

                        </div>

                        {/* RIGHT COLUMN */}

                        <div className="add-plan-col right-col">

                            {/* FEATURES */}

                            <div className="section-header-flex">

                                <label className="section-label">
                                    Plan Features
                                </label>

                                <button
                                    className="btn-add-benefit"
                                    onClick={addFeature}
                                >
                                    <div className="plus-icon-circle">
                                        <Plus
                                            size={10}
                                            strokeWidth={4}
                                        />
                                    </div>

                                    <span>Add Feature</span>
                                </button>
                            </div>

                            <div className="benefits-list">

                                <DndContext
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >

                                    <SortableContext
                                        items={form.features.map(f => f.id)}
                                        strategy={
                                            verticalListSortingStrategy
                                        }
                                    >

                                        {form.features.map((feature) => (

                                            <SortableFeature
                                                key={feature.id}
                                                feature={feature}
                                                removeFeature={
                                                    removeFeature
                                                }
                                            />
                                        ))}

                                    </SortableContext>

                                </DndContext>

                                {/* NEW FEATURE */}

                                <div className="benefit-pill new-benefit-pill">

                                    <input
                                        type="text"
                                        className="new-benefit-input"
                                        placeholder="Add new feature..."
                                        value={newFeature}
                                        onChange={(e) =>
                                            setNewFeature(
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={(e) => {

                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addFeature();
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* SETTINGS */}

                            <div className="settings-section card">

                                <label className="section-label">
                                    Plan Settings
                                </label>

                                {/* POPULAR */}

                                <div className="settings-card">

                                    <div className="settings-info">
                                        <h4>Popular Plan</h4>
                                    </div>

                                    <div className="toggle-switch-wrapper">

                                        <input
                                            type="checkbox"
                                            id="popularToggle"
                                            className="toggle-checkbox"
                                            checked={form.isPopular}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    isPopular:
                                                        e.target.checked
                                                })
                                            }
                                        />

                                        <label
                                            htmlFor="popularToggle"
                                            className="toggle-label"
                                        />
                                    </div>
                                </div>

                                {/* ACTIVE */}

                                <div className="settings-card">

                                    <div className="settings-info">
                                        <h4>Plan Active</h4>
                                    </div>

                                    <div className="toggle-switch-wrapper">

                                        <input
                                            type="checkbox"
                                            id="activeToggle"
                                            className="toggle-checkbox"
                                            checked={form.isActive}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    isActive:
                                                        e.target.checked
                                                })
                                            }
                                        />

                                        <label
                                            htmlFor="activeToggle"
                                            className="toggle-label"
                                        />
                                    </div>
                                </div>

                                {/* PT */}

                                <div className="settings-card">

                                    <div className="settings-info">
                                        <h4>
                                            Personal Trainer Included
                                        </h4>
                                    </div>

                                    <div className="toggle-switch-wrapper">

                                        <input
                                            type="checkbox"
                                            id="ptToggle"
                                            className="toggle-checkbox"
                                            checked={
                                                form.personalTrainerIncluded
                                            }
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    personalTrainerIncluded:
                                                        e.target.checked
                                                })
                                            }
                                        />

                                        <label
                                            htmlFor="ptToggle"
                                            className="toggle-label"
                                        />
                                    </div>
                                </div>

                                {/* DIET */}

                                <div className="settings-card">

                                    <div className="settings-info">
                                        <h4>Diet Plan Included</h4>
                                    </div>

                                    <div className="toggle-switch-wrapper">

                                        <input
                                            type="checkbox"
                                            id="dietToggle"
                                            className="toggle-checkbox"
                                            checked={
                                                form.dietPlanIncluded
                                            }
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    dietPlanIncluded:
                                                        e.target.checked
                                                })
                                            }
                                        />

                                        <label
                                            htmlFor="dietToggle"
                                            className="toggle-label"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}

                    <div className="add-plan-footer">

                        <button
                            className="btn-cancel-text btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn-solid-purple-pill btn-primary"
                            onClick={handleSubmit}
                        >
                            {isEdit
                                ? 'Update Plan'
                                : 'Create Plan'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPlan;