'use client'
import React, { useState, ChangeEvent, MouseEvent } from 'react';
import styles from '@/app/css/signIn.module.css';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import {useUser} from '../context/UserContext';

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
  const router = useRouter();
  const {setUser} = useUser();

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

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try{
      const res = await fetch("http://localhost:3000/api/auth/signin",{
        cache:'no-store',
        method:"POST",
        headers:  {
            "Content-Type":"application/json",
          },
          body: JSON.stringify({email: formData.email, password: formData.password})
      })

      const data = await res.json();

      if(!data.success){
         toast.error("Error: " + "Invalid credentials");
                 return;
      }

      setUser({
  ...data.user,
});
      router.push("/userProfile");
      
    }catch(error: any){
      setErrors(error.messsage)
    }
    
      
     
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


                {/* Footer */}
                <div className="text-center">
                  <p className={styles.signinFooterText}>
                    Don't have an account? <Link href="/login" className={styles.signinSignupLink}>Sign Up</Link>
                  </p>
                </div>
                                          <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    width: "fit-content"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;