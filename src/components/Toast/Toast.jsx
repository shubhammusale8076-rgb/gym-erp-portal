import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from '../../redux/toastSlice';
import './Toast.css';


export default function Toast() {

    const toasts = useSelector((state) => state.toast);
    const dispatch = useDispatch();

    // const [toasts, setToasts] = useState([
    //     { id: 1, message: "Success! Your action worked 🎉", type: "success", isLeaving: false },
    // ]);

    useEffect(() => {
        const timers = toasts.map((toast) =>
            setTimeout(() => dispatch(removeToast(toast.id)), 5000)
        );
        return () => timers.forEach((t) => clearTimeout(t));
    }, [toasts, dispatch]);




    console.log('TOASTS IN RENDER:', toasts);
    return (
        <>
            <div className={`toast-container `}>
                {toasts.map((toast) => (
                    <div key={toast.id} className={`toast ${toast.type}`}>
                        <p>{toast.message}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
