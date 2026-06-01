import { CircleAlert, CircleCheck } from 'lucide-react'
import './IntegrationStatusPage.css'
import { useNavigate } from 'react-router-dom'

export default function IntegrationStatusPage() {

    const params = new URLSearchParams(window.location.search)
    const status = params.get('status')
    const isConnected = status === 'connected'
    const navigate = useNavigate()

    return (
        <div className="integration-status-page">
            <div className="integration-status-card">
                <div className="status-top-glow"></div>
                <div className="status-icon-wrapper">
                    <div className={`status-icon ${isConnected ? 'success' : 'error'}`}>
                        {isConnected ? <CircleCheck size={45} /> : <CircleAlert size={45} />}
                    </div>

                </div>
                <div className="status-content">
                    <h1 className="status-title">
                        {
                            isConnected
                                ? 'Google Connected Successfully'
                                : 'Google Connection Failed'
                        }
                    </h1>
                    <p className="status-description">
                        {
                            isConnected
                                ? 'Your Google Workspace integration is now active. Gmail, Calendar, and Sheets automation are ready for your Gym SaaS workflows.'
                                : 'We were unable to complete the Google OAuth connection process. Please retry the connection or verify your Google OAuth configuration.'
                        }
                    </p>

                </div>

                <div className="status-meta-card">
                    <div className="meta-row">
                        <div className="meta-left">
                            <div className='meta-icon'>
                                <img src='https://cdn-icons-png.flaticon.com/512/300/300221.png' alt="google" />
                            </div>
                            <div>
                                <h4 className='meta-name'>Google Workspace</h4>
                                <p className='meta-description'>Authentication Service</p>
                            </div>
                        </div>

                        <div className={`meta-status ${isConnected ? 'success' : 'error'}`}>
                            <span className={`status-dot ${isConnected ? 'green' : 'red'}`}></span>
                            {isConnected ? 'CONNECTED' : 'FAILED'}
                        </div>
                    </div>

                </div>

                <div className="status-actions">

                    {
                        isConnected ? (
                            <>

                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        navigate('/settings/integrations/google/details');
                                    }}
                                >
                                    Manage Integration
                                </button>

                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        navigate('/settings/integrations');
                                    }}
                                >
                                    Back To Marketplace
                                </button>

                            </>
                        ) : (
                            <>

                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        navigate('/settings/integrations');
                                    }}
                                >
                                    Retry Connection
                                </button>

                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        navigate('/')
                                    }}
                                >
                                    Back To Dashboard
                                </button>

                            </>
                        )
                    }

                </div>

            </div>

        </div>
    )
}



