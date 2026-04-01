import React from 'react'
import { useState, useRef, useEffect } from "react";
import "./Dropdown.css";
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Dropdown({label,  actions }) {

    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <>
            <div className="action-menu" ref={menuRef}>
                <button
                    className={`menu-trigger ${label ? "with-label" : ""}`}
                    onClick={() => setOpen((prev) => !prev)}
                    type="button"
                >
                    {label ? (
                        <>
                            <span className="trigger-label">{label}</span>
                            <ChevronDown size={20} className="trigger-icon" />
                        </>
                    ) : (
                        <ChevronUp />
                    )}
                </button>

                {open && (
                    <div className="menu-dropdown">
                        {actions.map((act, idx) => (
                            <button
                                key={idx}
                                className={`menu-item ${act.type || ""}`}
                                onClick={() => {
                                    act.onClick();
                                    setOpen(false);
                                }}
                            >
                                {act.icon && <span className="icon">{act.icon}</span>}
                                {act.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>


        </>
    )
}
