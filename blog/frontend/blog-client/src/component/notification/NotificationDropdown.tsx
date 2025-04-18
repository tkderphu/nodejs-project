import React, { useState, useEffect, useRef } from 'react';
import Notification from './Notification';

export default function NotificationDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            //@ts-ignore
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="dropdown me-3 mx-5" ref={dropdownRef}>
            <button
                className="btn btn-outline-primary position-relative"
                onClick={toggleDropdown}
                type="button"

                id="notificationDropdown"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                </svg>
                0
            </button>

            <ul
                className={`dropdown-menu dropdown-menu-end  notifications ${open ? 'show' : ''}`}
                style={{
                    position: 'absolute',
                    right: "-150%", // shift dropdown left of button
                    top: '100%',   // place dropdown below button
                    zIndex: 9999,
                    width: "500px",
                    maxHeight: "80vh",
                    overflowY: "auto"
                }}
                aria-labelledby="notificationDropdown"
            >
                <Notification />
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item text-center text-primary" href="#">
                        Xem tất cả
                    </a>
                </li>
            </ul>
        </div >
    );
}
