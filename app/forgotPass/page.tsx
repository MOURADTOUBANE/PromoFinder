'use client'
import React, { useState, ChangeEvent, MouseEvent } from 'react';
import styles from '@/app/css/forgotPass.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

const ForgotPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      console.log('Reset email sent to:', formData.email);
    }
  };

  const handleButtonHover = (e: MouseEvent<HTMLButtonElement>, isEntering: boolean): void => {
    const target = e.target as HTMLButtonElement;
    if (isEntering) {
      target.style.transform = 'translateY(-2px)';
      target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
    } else {
      target.style.transform = 'translateY(0)';
      target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
    }
  };

  const router = useRouter();
  
  const handleBackToSignIn = (): void => {
  router.push('signIn');
  };

  return (
    <div className={styles.forgotContainer}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className={styles.forgotCard}>
              <div className="p-4">
                {!isSubmitted ? (
                  <>
                    {/* Header */}
                    <div className="text-center mb-4">
                      <div className="mb-3">
                        <div className={styles.forgotIcon}>
                          <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                          </svg>
                        </div>
                      </div>
                      <h2 className={styles.forgotTitle}>Forgot Password?</h2>
                      <p className={styles.forgotSubtitle}>
                        No worries! Enter your email address and we'll send you a link to reset your password.
                      </p>
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                      <input
                        type="email"
                        className={`form-control form-control-lg ${styles.forgotInput} ${errors.email ? styles.isInvalid : ''}`}
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && (
                        <div className={styles.forgotError}>{errors.email}</div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      className={styles.forgotSubmitBtn}
                      onMouseEnter={(e) => handleButtonHover(e, true)}
                      onMouseLeave={(e) => handleButtonHover(e, false)}
                    >
                      Send Reset Link
                    </button>

                    {/* Back to Sign In */}
                    <div className="text-center">
                      <Link href="/signIn" className={styles.forgotBackLink}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </svg>
                        Back to Sign In
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Success State */}
                    <div className="text-center mb-4">
                      <div className="mb-3">
                        <div className={styles.forgotSuccessIcon}>
                          <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                      </div>
                      <h2 className={styles.forgotTitle}>Check Your Email</h2>
                      <p className={styles.forgotSubtitle}>
                        We've sent a password reset link to <strong>{formData.email}</strong>
                      </p>
                    </div>

                    {/* Instructions */}
                    <div className={styles.forgotInstructions}>
                      <h6 className={styles.forgotInstructionsTitle}>What's next?</h6>
                      <ul className={styles.forgotInstructionsList}>
                        <li>Check your email inbox (and spam folder)</li>
                        <li>Click the reset link in the email</li>
                        <li>Create your new password</li>
                      </ul>
                    </div>

                    {/* Resend & Back Options */}
                    <div className="text-center mb-3">
                      <p className={styles.forgotResendText}>
                        Didn't receive the email?{' '}
                        <button 
                          onClick={handleSubmit}
                          className={styles.forgotResendBtn}
                        >
                          Resend
                        </button>
                      </p>
                    </div>

                    <div className="text-center">
                      <button 
                        onClick={handleBackToSignIn}
                        className={styles.forgotBackLink}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </svg>
                        Back to Sign In
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;