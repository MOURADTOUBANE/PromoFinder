'use client'
import React, { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '@/app/css/forgotPass.module.css';
import { ToastContainer, toast } from 'react-toastify';



const ResetPassword: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      toast.error('Fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!token) {
      toast.error('Invalid or missing token');
      return;
    }

    try {
      const res = await fetch('/api/auth/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => router.push('/signIn'), 2000);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
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
          <div className="col-12 col-md-6">
            <div className={styles.forgotCard}>
              <div className="p-4">
                {!success ? (
                  <>
                    <div className="text-center mb-4">
                      <h2 className={styles.forgotTitle}>Reset Password</h2>
                      <p className={styles.forgotSubtitle}>
                        Enter your new password below.
                      </p>
                    </div>

                    <div className="mb-3">
                      <input
                        type="password"
                        className={`form-control form-control-lg ${styles.forgotInput}`}
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className={`form-control form-control-lg ${styles.forgotInput}`}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {error && <div className={styles.forgotError}>{error}</div>}

                    <button
                      onClick={handleSubmit}
                      className={styles.forgotSubmitBtn}
                      onMouseEnter={(e) => handleButtonHover(e, true)}
                      onMouseLeave={(e) => handleButtonHover(e, false)}
                    >
                      Change Password
                    </button>
                  </>
                ) : (
                  <div className="text-center mb-4">
                    <h2 className={styles.forgotTitle}>Password Changed!</h2>
                    <p className={styles.forgotSubtitle}>
                      Your password has been successfully updated. Redirecting to Sign In...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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
  );
};

export default ResetPassword;
