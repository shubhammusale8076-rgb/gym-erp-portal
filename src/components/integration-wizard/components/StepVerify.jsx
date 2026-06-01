import React, { useEffect, useMemo, useState, } from "react";
import { RefreshCw, Key, Webhook, CheckCircle2, Loader2, AlertCircle, Send, Shield, Smartphone, Database, } from "lucide-react";
import { connectIntegrationApi, validateIntegrationapi } from "../../../apiservice/integrationService";
import { useDispatch } from "react-redux";
import { showToast } from "../../../redux/toastSlice";

const PROVIDER_VERIFY_CONFIG = {

   whatsapp: {

      title: "Live WhatsApp Verification",

      description:
         "Validate your WhatsApp Business credentials, webhook connection, and send a real test message before activating the integration.",

      checks: [
         {
            key: "token",
            title: "Access Token",
            icon: Key,
            loadingText:
               "Validating Meta access token...",
            successText:
               "Authentication verified successfully.",
         },
         {
            key: "phone",
            title: "Phone Number ID",
            icon: Smartphone,
            loadingText:
               "Checking WhatsApp phone profile...",
            successText:
               "Phone number connected successfully.",
         },
         {
            key: "webhook",
            title: "Webhook Connection",
            icon: Webhook,
            loadingText:
               "Verifying webhook endpoint...",
            successText:
               "Webhook connection established.",
         },
         {
            key: "message",
            title: "Test Message",
            icon: Send,
            loadingText:
               "Sending WhatsApp test message...",
            successText:
               "Message delivered successfully.",
         },
      ],
   },

   razorpay: {

      title: "Live Razorpay Verification",

      description:
         "Validate Razorpay credentials and webhook security before enabling payment synchronization.",

      checks: [
         {
            key: "api",
            title: "API Credentials",
            icon: Key,
            loadingText:
               "Verifying Razorpay API credentials...",
            successText:
               "API credentials verified successfully.",
         },
         {
            key: "webhook",
            title: "Webhook Signature",
            icon: Webhook,
            loadingText:
               "Checking webhook signature validation...",
            successText:
               "Webhook signature validated.",
         },
      ],
   },
};

const StepVerify = ({ provider, data, onSuccess, }) => {
   const config = PROVIDER_VERIFY_CONFIG[provider];
   const [verificationSteps, setVerificationSteps] = useState([]);
   const [loading, setLoading] = useState(false);
   const [testNumber, setTestNumber] = useState("");
   const [integrationVerified, setIntegrationVerified] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const dispatch = useDispatch();
   console.log(provider)

   const completedChecks = useMemo(() => {

      return verificationSteps.filter(
         (step) => step.status === "success"
      ).length;

   }, [verificationSteps]);

   useEffect(() => {

      const initialSteps =
         config.checks.map((check) => ({
            ...check,
            status: "idle",
         }));

      setVerificationSteps(initialSteps);

   }, [provider]);

   const updateStepStatus = (key, status) => {

      setVerificationSteps((prev) =>
         prev.map((step) =>
            step.key === key
               ? {
                  ...step,
                  status,
               }
               : step
         )
      );
   };

   const normalizePhoneNumber = (phone) => {

      let normalized = phone.replace(/\D/g, "");

      if (normalized.length === 10) {
         normalized = `91${normalized}`;
      }

      return normalized;
   };

   const validateIntegration = async () => {

      if (provider === "whatsapp" && !testNumber) {

         alert("Please enter recipient WhatsApp number");
         return;
      }

      setLoading(true);

      setErrorMessage("");

      try {



         verificationSteps.forEach((step) => {

            updateStepStatus(step.key, "loading");
         });



         const result = await validateIntegrationapi({
            integrationType: provider.toUpperCase(),
            config: data,
            testData: { recipientNumber: normalizePhoneNumber(testNumber) },
         });

         console.log("Validation Result", result);


         if (!result.success) {

            verificationSteps.forEach((step) => {

               updateStepStatus(step.key, "error");
            });

            throw new Error(result.message || "Validation failed");
         }




         const checks = result.checks || {};

         for (const [key, value] of Object.entries(checks)) {

            await new Promise((resolve) => setTimeout(resolve, 500));

            updateStepStatus(key, value ? "success" : "error");

         }

         const allPassed = Object.values(checks).every((value) => value === true);

         setIntegrationVerified(allPassed);

      } catch (error) {

         console.error(error);

         setErrorMessage(
            error.message || "Validation failed"
         );

      } finally {

         setLoading(false);
      }
   };

   const activateIntegration = async () => {

      try {
         setLoading(true);
         const response = await connectIntegrationApi({
            integrationType: provider.toUpperCase(),
            config: data,
         });

         if (response.status !== "CONNECTED") {
            throw new Error("Failed to activate integration");
         }
         dispatch(showToast({ message: "Integration activated successfully!", type: "success" }));


         onSuccess();

      } catch (error) {

         console.error(error);

         dispatch(showToast({ message: "Failed to activate integration", type: "error" }));

      }
      finally {

         setLoading(false);
      }
   };

   return (
      <div className="verify-config-container">
         <div className="verify-left-panel">
            <h2 className="guide-title">{config.title}</h2>
            <p className="guide-description">{config.description}</p>
            <div className="verify-main-card">
               <div className="verify-loader-ring">
                  <div className="ring-outer" />
                  <div className="ring-inner">
                     <RefreshCw
                        className={`spin-icon ${loading ? "active" : ""}`}
                        size={28}
                     />
                  </div>
               </div>
               <div className="verify-phase-info">
                  <span className="phase-label">LIVE VALIDATION STATUS</span>
                  <h3 className="phase-title"> {completedChecks} / {config.checks.length} Checks Completed</h3>
                  <p className="phase-time">{integrationVerified ? "Integration validated successfully" : "Waiting for validation"} </p>
               </div>
            </div>
            <div className="verify-status-grid">
               {verificationSteps.map(
                  (step) => {
                     const Icon = step.icon;
                     return (
                        <div key={step.key} className={`status-card ${step.status}`}  >
                           <div className="status-icon">
                              <Icon size={18} />
                           </div>
                           <div className="status-content">
                              <h4>{step.title}</h4>
                              <p>
                                 {step.status === "idle" && "Waiting for validation..."}
                                 {step.status === "loading" && step.loadingText}
                                 {step.status === "success" && step.successText}
                                 {step.status === "error" && "Validation failed"}
                              </p>
                           </div>
                           <div className="status-check">
                              {step.status === "loading" && (
                                 <Loader2 className="spin" size={18} />
                              )}

                              {step.status === "success" && (
                                 <CheckCircle2 size={18} />
                              )}

                              {step.status === "error" && (
                                 <AlertCircle size={18} />
                              )}
                           </div>
                        </div>
                     );
                  }
               )}

            </div>


         </div>

         <div className="verify-right-panel">
            <div className="troubleshooting-card">
               <div className="trouble-header">
                  <Database size={20} className="header-icon" />
                  <h3> Live Integration Test</h3>
               </div>

               <p className="trouble-desc"> Perform real-time provider validation before activating this integration permanently. </p>

               {provider === "whatsapp" && (
                  <div className="test-message-box">
                     <label>Recipient WhatsApp Number</label>
                     <input
                        type="text"
                        placeholder="91-9999999999"
                        value={testNumber}
                        onChange={(e) => setTestNumber(e.target.value)}
                     />
                     <small>Enter a verified WhatsApp test number to receive a live test message.</small>

                  </div>
               )
               }

               <div className="support-box">

                  <Shield size={20} className="support-icon" />
                  <div className="support-content">
                     <h5> SECURE TEMP VALIDATION </h5>
                     <p> Credentials are validated temporarily and are NOT stored until activation succeeds.</p>
                  </div>
               </div>

               {
                  !integrationVerified ? (
                     <button className="btn-primary" onClick={validateIntegration} disabled={loading} >
                        {loading ? "Validating..." : "Run Live Verification"}
                     </button>

                  ) : (

                     <button className="btn-primary" onClick={activateIntegration} >
                        Activate Integration
                     </button>
                  )
               }

            </div>

            {errorMessage && (
               <div className="verify-error-box card">
                  <AlertCircle size={32} />
                  <span>{errorMessage}</span>
               </div>
            )}

         </div>

      </div>
   );
};

export default StepVerify;