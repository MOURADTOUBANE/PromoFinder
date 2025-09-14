'use client'
import React, { useState, ChangeEvent, MouseEvent } from 'react';
import styles from '@/app/css/signIn.module.css';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      alert('Sign in successful!');
      console.log('Form data:', formData);
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

  return (
    <div className={styles.signinContainer}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className={styles.signinCard}>
              <div className="p-4">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <div className={styles.signinIcon}>
                      <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className={styles.signinTitle}>Welcome Back</h2>
                  <p className={styles.signinSubtitle}>Sign in to your account</p>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control form-control-lg ${styles.signinInput} ${errors.email ? styles.isInvalid : ''}`}
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <div className={styles.signinError}>{errors.email}</div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${styles.signinInput} ${errors.password ? styles.isInvalid : ''}`}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <div className={styles.signinError}>{errors.password}</div>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <input
                      className={`form-check-input me-2 ${styles.signinCheckbox}`}
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <label className={styles.signinRememberLabel}>
                      Remember me
                    </label>
                  </div>
                  <Link href="/forgotPass" className={styles.signinForgotLink}>
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className={styles.signinSubmitBtn}
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonHover(e, false)}
                >
                  Sign In
                </button>

                {/* Divider */}
                <div className={styles.signinDivider}>
                      </div>
                 
              

                {/* Social Login Buttons */}
                <div className="mb-4">
                  <button className={styles.signinSocialBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" className="me-2">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                 
                </div>

                {/* Footer */}
                <div className="text-center">
                  <p className={styles.signinFooterText}>
                    Don't have an account? <Link href="/login" className={styles.signinSignupLink}>Sign Up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;