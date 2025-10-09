'use client';
import React, { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import styles from '@/app/css/register.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '../context/UserContext';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) { newErrors.email = 'Email is required';
    } 
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    const getEmails = async () => {
      try { 
        const res = await fetch("/api/auth/signup", {
          method: "GET",
          cache: "no-store"
        });
        
        const data = await res.json();

        const userEmails = (data.users ?? [])
          .filter((user: unknown) => user && typeof user === 'object' && 'Email' in (user as any))
          .map((user: unknown) => ((user as any).Email as string).toLowerCase());
        
        setEmails(userEmails);
        
      } catch (error: unknown) {
        if (error instanceof Error) setError("Failed to fetch emails: " + error.message);
        else setError("Failed to fetch emails");
      }
    };
    
    getEmails();
  }, []);

  const router = useRouter();
  const { setUser } = useUser();

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
       if(!emails.includes(formData.email.trim().toLowerCase())){

        try{
          const res = await fetch("/api/auth/signup",{
            cache:"no-store",
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({ fullName: formData.fullName, email: formData.email, password: formData.password })
          });

          const data = await res.json();

          if (!data.success) {
            setError("Error: " + (data.error || "Unknown error"));
            return;
          }

          setUser({ ...data.user });
          router.push("/userProfile");
     
        } catch (error: unknown) {
          if (error instanceof Error) setError("Network Error: " + error.message);
          else setError("Network Error");
        }

       } else {
         toast.error(" This email address already exists!");
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
    
    <div className={styles.registerContainer}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className={styles.registerCard}>
              <div className="card-body ">
      
               
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <div className={styles.registerIcon}>
                      <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className={styles.registerTitle}>Create Account</h2>
                  <p className={styles.registerSubtitle}>Join us today and get started</p>
                </div>

          
                <div className="row mb-3">
                  <div className=" mb-3">
                    <div className="position-relative">
                      <input
                        type="text"
                        className={`form-control form-control-lg ${styles.registerInput} ${errors.fullName ? 'is-invalid' : ''}`}
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                      {errors.fullName && (
                        <div className={styles.registerError}>{errors.fullName}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control form-control-lg ${styles.registerInput} ${errors.email ? 'is-invalid' : ''}`}
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <div className={styles.registerError}>{errors.email}</div>
                  )}
                </div>

               
                <div className="mb-3">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${styles.registerInput} ${errors.password ? 'is-invalid' : ''}`}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <div className={styles.registerError}>{errors.password}</div>
                  )}
                </div>

               
                <div className="mb-4">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${styles.registerInput} ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {errors.confirmPassword && (
                    <div className={styles.registerError}>{errors.confirmPassword}</div>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="mb-4">
                  <div className="d-flex align-items-start">
                    <input
                      className={`form-check-input me-3 mt-1 ${styles.registerCheckbox} ${errors.agreeToTerms ? styles.borderDanger : ''}`}
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                    />
                    <label className={styles.registerTermsLabel}>
                      I agree to the <a href="#" className={styles.registerLink}>Terms of Service</a> and <a href="#" className={styles.registerLink}>Privacy Policy</a>
                    </label>
                  </div>
                  {errors.agreeToTerms && (
                    <div className={styles.registerError}>{errors.agreeToTerms}</div>
                  )}
                </div>

              
                <button
                  onClick={handleSubmit}
                  className={styles.registerSubmitBtn}
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonHover(e, false)}
                >
                  Create Account
                </button>

                
                <div className="text-center">
                  <p className={styles.registerFooterText}>
                    Already have an account? <Link href="/signIn" className={styles.registerSigninLink}>Sign In</Link>
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

export default RegisterForm;