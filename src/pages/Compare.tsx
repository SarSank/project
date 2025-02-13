import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Lock, Shield } from 'lucide-react';
import './Compare.css';

interface FormData {
    loanPurpose: string;
    loanAmount: string;
    employmentType: string;
    monthlyIncome: string;
    creditScore: string;
    urgency: string;
    homeOwnership: string;
    estimatedCreditScore: string;
    directDeposit: string;
    annualIncome: string;
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
    };
}

const Compare = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        loanPurpose: '',
        loanAmount: '',
        employmentType: '',
        monthlyIncome: '',
        creditScore: '',
        urgency: '',
        homeOwnership: '',
        estimatedCreditScore: '',
        directDeposit: '',
        annualIncome: '',
        personalInfo: {
            fullName: '',
            email: '',
            phone: ''
        }
    });

    const totalSteps = 6;
    const progress = (step / totalSteps) * 100;

    const loanPurposes = [
        'Home Renovation',
        'Debt Consolidation',
        'Medical Expenses',
        'Education',
        'Wedding',
        'Business',
        'Vehicle Purchase',
        'Travel',
        'Other'
    ];

    const urgencyOptions = [
        'Immediately',
        'Within a week',
        'Within a month'
    ];

    const homeOwnershipOptions = [
        'Rent',
        'Own'
    ];

    const estimatedCreditScoreOptions = [
        'Good',
        'Average',
        'Bad'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in formData.personalInfo) {
            setFormData(prev => ({
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const canContinue = () => {
        switch (step) {
            case 1:
                return !!formData.loanPurpose;
            case 2:
                return !!formData.loanAmount;
            case 3:
                return !!formData.employmentType && !!formData.monthlyIncome;
            case 4:
                return !!formData.urgency;
            case 5:
                return !!formData.homeOwnership && !!formData.estimatedCreditScore && !!formData.directDeposit && !!formData.annualIncome;
            case 6:
                return !!formData.personalInfo.fullName && 
                       !!formData.personalInfo.email && 
                       !!formData.personalInfo.phone;
            default:
                return false;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < totalSteps) {
            setStep(prev => prev + 1);
        } else {
            console.log('Form submitted:', formData);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="form-step">
                        <h2>What's the purpose of your loan?</h2>
                        <p className="step-description">
                            Select the primary reason you're seeking this loan
                        </p>
                        <select
                            name="loanPurpose"
                            value={formData.loanPurpose}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select loan purpose</option>
                            {loanPurposes.map(purpose => (
                                <option key={purpose} value={purpose}>
                                    {purpose}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            case 2:
                return (
                    <div className="form-step">
                        <h2>Loan Amount</h2>
                        <div className="form-group">
                            <label>How much would you like to borrow?</label>
                            <input
                                type="number"
                                name="loanAmount"
                                value={formData.loanAmount}
                                onChange={handleInputChange}
                                placeholder="Enter amount"
                                min="10000"
                                max="1000000"
                                required
                            />
                            <span className="input-hint">₹10,000 - ₹10,00,000</span>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="form-step">
                        <h2>Employment Details</h2>
                        <div className="form-group">
                            <label>Employment Type</label>
                            <select
                                name="employmentType"
                                value={formData.employmentType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select employment type</option>
                                <option value="salaried">Salaried</option>
                                <option value="self-employed">Self Employed</option>
                                <option value="business">Business Owner</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Monthly Income</label>
                            <input
                                type="number"
                                name="monthlyIncome"
                                value={formData.monthlyIncome}
                                onChange={handleInputChange}
                                placeholder="Enter monthly income"
                                required
                            />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="form-step">
                        <h2>How quickly do you need the money?</h2>
                        <div className="form-group">
                            <select
                                name="urgency"
                                value={formData.urgency}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select urgency</option>
                                {urgencyOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="form-step">
                        <h2>Home Ownership</h2>
                        <div className="form-group">
                            <label>Do you rent or own your home?</label>
                            <select
                                name="homeOwnership"
                                value={formData.homeOwnership}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select option</option>
                                {homeOwnershipOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Your Estimated Credit Score</label>
                            <select
                                name="estimatedCreditScore"
                                value={formData.estimatedCreditScore}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select credit score</option>
                                {estimatedCreditScoreOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Do you get paid via direct deposit?</label>
                            <select
                                name="directDeposit"
                                value={formData.directDeposit}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Annual Income Before Taxes</label>
                            <input
                                type="number"
                                name="annualIncome"
                                value={formData.annualIncome}
                                onChange={handleInputChange}
                                placeholder="Enter annual income"
                                required
                            />
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="form-step">
                        <h2>Personal Information</h2>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.personalInfo.fullName}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.personalInfo.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.personalInfo.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                pattern="[0-9]{10}"
                                required
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="compare-page">
            <div className="loan-application-container">
                <div className="form-header">
                    <h1>Personal Loan Application</h1>
                    <p>Complete your application in just a few steps</p>
                </div>

                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                    <div className="steps-indicator">
                        {Array.from({ length: totalSteps }, (_, i) => (
                            <div
                                key={i}
                                className={`step-dot ${i + 1 <= step ? 'active' : ''}`}
                                data-step={i + 1}
                            />
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="loan-form">
                    {renderStep()}

                    <div className="form-actions">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={() => setStep(prev => prev - 1)}
                                className="back-button"
                            >
                                <ArrowLeft size={20} />
                                Back
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={!canContinue()}
                            className="continue-button"
                        >
                            {step === totalSteps ? 'Compare Now' : 'Continue'}
                            {step !== totalSteps && <ArrowRight size={20} />}
                        </button>
                    </div>

                    <div className="security-info">
                        <div className="security-item">
                            <Lock size={16} />
                            <span>Your information is securely encrypted</span>
                        </div>
                        <div className="security-item">
                            <Shield size={16} />
                            <span>No impact to your credit score</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Compare;