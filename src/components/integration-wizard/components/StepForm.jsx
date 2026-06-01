import React from "react";

import server from "../../../assets/server.png";

const StepForm = ({ provider, fields = [], data, updateData, }) => {



    const handleChange = ( name, value) => {

        updateData({ [name]: value, });
    };

    return (
        <div className="step-form">
            <div className="step-form-header">
                <h2>Configure {provider} Credentials</h2>
                <p> Securely reconnect your provider by updating the latest credentials below.</p>
            </div>

            <div className="form-wrapper">

                <div className="form-box">
                    {
                        fields.map((field) => (
                            <div className="input-group" key={field.name}>
                                <label>
                                    {field.label}
                                    { field.required && ( <span className="required">*</span> )
                                    }

                                </label>

                                <input
                                    type={
                                        field.type ||
                                        "text"
                                    }

                                    placeholder={
                                        field.placeholder
                                    }

                                    value={
                                        data?.[
                                        field.name
                                        ] || ""
                                    }

                                    onChange={(e) =>
                                        handleChange(
                                            field.name,
                                            e.target.value
                                        )
                                    }

                                    autoComplete="off"
                                />

                                {
                                    field.helperText && (

                                        <small className="helper-text">

                                            {
                                                field.helperText
                                            }

                                        </small>
                                    )
                                }

                            </div>
                        ))
                    }

                </div>

                {/* RIGHT */}

                <div className="right-img-box">

                    <img
                        src={server}
                        alt="Secure Integration"
                        className="secure-img"
                    />

                    <div className="img-overlay">

                        <h2>
                            Enterprise Grade Security
                        </h2>

                        <p>
                            All credentials are
                            encrypted before storage
                            using AES-256 encryption
                            and transmitted securely
                            through protected
                            communication channels.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default StepForm;