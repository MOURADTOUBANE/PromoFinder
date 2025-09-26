'use client'
import React, { useState, ChangeEvent, MouseEvent } from 'react';
import styles from '@/app/css/forgotPass.module.css';
import { useRouter } from 'next/navigation';


interface FormData {
  email: string;
}

const ForgotPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '' });
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
    setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email is invalid');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch('/api/auth/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleBackToSignIn = () => {
    router.push('/signIn');
  };

  const handleButtonHover = (e: MouseEvent<HTMLButtonElement>, isEntering: boolean) => {
    const target = e.target as HTMLButtonElement;
    if (isEntering) {
      target.style.transform = 'translateY(-2px)';
      target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
    } else {
      target.style.transform = 'translateY(0)';
      target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
    }
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
                    <div className="text-center mb-4">
                      <h2 className={styles.forgotTitle}>Forgot Password?</h2>
                      <p className={styles.forgotSubtitle}>
                        Enter your email address and we'll send you a link to reset your password.
                      </p>
                    </div>

                    <div className="mb-4">
                      <input
                        type="email"
                        className={`form-control form-control-lg ${styles.forgotInput} ${error ? styles.isInvalid : ''}`}
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {error && <div className={styles.forgotError}>{error}</div>}
                    </div>

                    <button
                      onClick={handleSubmit}
                      className={styles.forgotSubmitBtn}
                      onMouseEnter={(e) => handleButtonHover(e, true)}
                      onMouseLeave={(e) => handleButtonHover(e, false)}
                    >
                      Send Reset Link
                    </button>

                    <div className="text-center mt-3">
                      <button onClick={handleBackToSignIn} className={styles.forgotBackLink}>
                        Back to Sign In
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center mb-4">
                    <h2 className={styles.forgotTitle}>Check Your Email</h2>
                    <p className={styles.forgotSubtitle}>
                      We've sent a password reset link to <strong>{formData.email}</strong>
                    </p>
                  </div>
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
