import React, { useState } from 'react';
import { Calendar, Filter, MoreHorizontal, Plus, X } from 'lucide-react';
import './Events.css';

const Events = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState([
        { id: 'evt_9k2Lp823m', name: 'Payment Capture', type: 'payment.captured', status: 'SUCCESS', timestamp: 'Oct 24, 2023 • 14:22:01' },
        { id: 'evt_4xSRj912n', name: 'Membership Renewed', type: 'membership.renewed', status: 'SUCCESS', timestamp: 'Oct 24, 2023 • 14:18:45' },
        { id: 'evt_2u1Ty345k', name: 'Missed Payment Reminder', type: 'reminder.sent', status: 'PENDING', timestamp: 'Oct 24, 2023 • 14:15:10' },
        { id: 'evt_7v8MmS67q', name: 'Class Booking Canceled', type: 'booking.canceled', status: 'FAILED', timestamp: 'Oct 24, 2023 • 13:55:22' },
        { id: 'evt_8w2Nn342z', name: 'Welcome Email Sent', type: 'email.sent', status: 'SUCCESS', timestamp: 'Oct 24, 2023 • 13:42:00' },
    ]);

    const [newEvent, setNewEvent] = useState({ name: '', type: '', status: 'SUCCESS' });

    const getStatusClass = (status) => {
        switch (status) {
            case 'SUCCESS': return 'status-success';
            case 'FAILED': return 'status-failed';
            case 'PENDING': return 'status-pending';
            default: return 'status-default';
        }
    };

    const handleCreateEvent = (e) => {
        e.preventDefault();
        const createdEvent = {
            id: `evt_${Math.random().toString(36).substr(2, 9)}`,
            name: newEvent.name || 'New Event',
            type: newEvent.type || 'custom.event',
            status: newEvent.status,
            timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
        };
        setEvents([createdEvent, ...events]);
        setIsModalOpen(false);
        setNewEvent({ name: '', type: '', status: 'SUCCESS' });
    };

    return (
        <div className="events-page">
            <div className="events-header-section">
                <div>
                    <h1>Events</h1>
                    <p className="subtitle">Monitor all integration activities</p>
                </div>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={16} /> Create New Event
                </button>
            </div>

            <div className="filters-container card">
                <div className="filter-group">
                    <label>INTEGRATION</label>
                    <select className="filter-select">
                        <option>All Integrations</option>
                        <option>Stripe Payments</option>
                        <option>Mailchimp Sync</option>
                        <option>Zendesk API</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>STATUS</label>
                    <select className="filter-select">
                        <option>All Statuses</option>
                        <option>Success</option>
                        <option>Failed</option>
                        <option>Pending</option>
                    </select>
                </div>
                <div className="filter-group date-filter">
                    <label>DATE RANGE</label>
                    <div className="date-input-wrapper">
                        <input type="text" className="filter-input" defaultValue="Last 24 Hours" readOnly />
                        <Calendar size={16} className="input-icon" />
                    </div>
                </div>
                <button className="btn-apply-filters">Apply Filters</button>
            </div>

            <div className="events-list-container table-container-wrapper">
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>EVENT ID</th>
                            <th>EVENT NAME</th>
                            <th>EVENT TYPE</th>
                            <th>STATUS</th>
                            <th>TIMESTAMP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((evt) => (
                            <tr key={evt.id}>
                                <td className="event-id">{evt.id}</td>
                                <td className="event-name">
                                    <div className="name-wrapper">
                                        <div className="icon-placeholder">
                                            <span>{evt.name.charAt(0)}</span>
                                        </div>
                                        <span>{evt.name}</span>
                                    </div>
                                </td>
                                <td className="event-type">{evt.type}</td>
                                <td>
                                    <span className={`status-pill-evt ${getStatusClass(evt.status)}`}>
                                        <div className="status-dot"></div>
                                        {evt.status}
                                    </span>
                                </td>
                                <td className="event-timestamp">{evt.timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Event Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Create New Event</h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateEvent}>
                            <div className="modal-body">
                                <div className="input-group">
                                    <label>Event Name</label>
                                    <input 
                                        type="text" 
                                        className="input-box" 
                                        placeholder="e.g. Payment Capture" 
                                        value={newEvent.name}
                                        onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="input-group mt-4">
                                    <label>Event Type</label>
                                    <input 
                                        type="text" 
                                        className="input-box" 
                                        placeholder="e.g. payment.captured" 
                                        value={newEvent.type}
                                        onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="input-group mt-4">
                                    <label>Status</label>
                                    <select 
                                        className="input-box" 
                                        value={newEvent.status}
                                        onChange={(e) => setNewEvent({...newEvent, status: e.target.value})}
                                    >
                                        <option value="SUCCESS">Success</option>
                                        <option value="FAILED">Failed</option>
                                        <option value="PENDING">Pending</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Create Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
