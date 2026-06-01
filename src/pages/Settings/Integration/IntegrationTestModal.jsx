import { X,} from "lucide-react";
import StepVerify from "../../../components/integration-wizard/components/StepVerify";
import './IntegrationTestModal.css'


const IntegrationTestModal = ({ open,onClose,provider,integration,}) => {

    if (!open) return null;

    return (
        <div className="integration-test-modal-overlay">
            <div className="integration-test-modal">
                <div className="integration-test-header">
                    <div className="integration-test-title">
                        <img src={integration.icon} alt={integration.displayName}/>
                        <div>
                            <h2>Test Connection</h2>
                            <p>{integration.displayName}</p>
                        </div>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="integration-test-body">

                    <StepVerify
                        provider={provider}
                        data={integration.metadata}
                        connectedMode={true}
                        onSuccess={() => {}}
                    />
                </div>
            </div>
        </div>
    );
};

export default IntegrationTestModal;