'use client';
import React, { useEffect, useState } from 'react';
import { Edit, Eye, EyeOff, Save, X } from 'lucide-react';
import styles from '@/app/css/userProfile.module.css';
import { useUser } from '../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import bcrypt from 'bcryptjs';

import { notFound } from 'next/navigation';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, setUser } = useUser();
  const [errors, setErrors] = useState("");

  const [userData, setUserData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    profilePicture: 'images/user-picture.jpg',
  });

  const [editForm, setEditForm] = useState({
    fullName: userData.fullName,
    email: userData.email,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setUserData({
        fullName: user.name,
        email: user.email,
        profilePicture: 'images/user-picture.jpg'
      });
      setEditForm({
        fullName: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({
        fullName: userData.fullName,
        email: userData.email,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    setUserData({
      ...userData,
      ...editForm,
    });

    try {
      const res = await fetch("http://localhost:3000/api/user/edit", {
        cache: "no-store",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "edit",
          userId: user.id,
          ...editForm,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error("Error: " + (data.error || "Unknown error"));
        return;
      }
      toast.success("Profile updated successfully!");
      setIsEditing(false);

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors(error.message);
      } else {
        setErrors(String(error));
      }
    }
  };

  const handlePasswordChange = async () => {
    const match = await bcrypt.compare(passwordForm.currentPassword, user.password);

    if (!match) {
      toast.error("Invalid Current Password");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
    toast.success("Password changed successfully!");

    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    try {
      const res = await fetch("http://localhost:3000/api/user/edit", {
        cache: 'no-store',
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "changePassword",
          password: passwordForm.confirmPassword,
          userId: user.id,
        })
      });

      const data = await res.json();

      if (!data.success) {
        setErrors("Error: " + "Invalid credentials");
        return;
      }
      setUser({
        ...data.user,
      });

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors(error.message);
      } else {
        setErrors(String(error));
      }
      return errors;
    }
  };

  if (!user) {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.mainTitle}>User Profile</h1>
            <p className={styles.subtitle}>Manage your account settings and preferences</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabsHeader}>
            <nav className={styles.tabsNav}>
              <button
                onClick={() => setActiveTab('profile')}
                className={`${styles.tabButton} ${activeTab === 'profile' ? styles.tabButtonActive : styles.tabButtonInactive}`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`${styles.tabButton} ${activeTab === 'security' ? styles.tabButtonActive : styles.tabButtonInactive}`}
              >
                Security
              </button>
            </nav>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Profile Information</h2>
                <button onClick={handleEditToggle} className={styles.editButton}>
                  {isEditing ? <X className={styles.buttonIcon} /> : <Edit className={styles.buttonIcon} />}
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {/* Profile Picture */}
              <div className={styles.profilePictureSection}>
                <label className={styles.fieldLabel}>Profile Picture</label>
                <div className={styles.profilePictureContainer}>
                  <div className={styles.profilePictureWrapper}>
                    <img
                      src={userData.profilePicture}
                      alt="Profile"
                      className={styles.profilePicture}
                    />
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Full Name</label>
                  <input
                    type="text"
                    value={isEditing ? editForm.fullName : userData.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    disabled={!isEditing}
                    className={`${styles.input} ${!isEditing ? styles.inputDisabled : ''}`}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    value={isEditing ? editForm.email : userData.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    disabled={!isEditing}
                    className={`${styles.input} ${!isEditing ? styles.inputDisabled : ''}`}
                  />
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className={styles.saveButtonContainer}>
                  <button onClick={handleSaveProfile} className={styles.saveButton}>
                    <Save className={styles.buttonIcon} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className={styles.tabContent}>
              <h2 className={styles.sectionTitle}>Change Password</h2>
              <div className={styles.passwordForm}>
                {/* Current Password */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Current Password</label>
                  <div className={styles.passwordInputContainer}>
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className={styles.passwordInput}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className={styles.passwordToggle}
                    >
                      {showCurrentPassword ? <EyeOff className={styles.eyeIcon} /> : <Eye className={styles.eyeIcon} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>New Password</label>
                  <div className={styles.passwordInputContainer}>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className={styles.passwordInput}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={styles.passwordToggle}
                    >
                      {showNewPassword ? <EyeOff className={styles.eyeIcon} /> : <Eye className={styles.eyeIcon} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Confirm New Password</label>
                  <div className={styles.passwordInputContainer}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className={styles.passwordInput}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={styles.passwordToggle}
                    >
                      {showConfirmPassword ? <EyeOff className={styles.eyeIcon} /> : <Eye className={styles.eyeIcon} />}
                    </button>
                  </div>
                </div>

                <button onClick={handlePasswordChange} className={styles.changePasswordButton}>
                  Change Password
                </button>
              </div>
            </div>
          )}
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
}
