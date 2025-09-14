'use client';
import React, { useState } from 'react';
import { Camera, Edit, Eye, EyeOff, Save, X, Monitor, Smartphone, MapPin, Calendar } from 'lucide-react';
import styles from '@/app/css/userProfile.module.css';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // User data state
  const [userData, setUserData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    fullName: userData.fullName,
    email: userData.email,
    username: userData.username
  });

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Sample login history data
  const [loginHistory] = useState([
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, USA',
      ip: '192.168.1.1',
      date: '2024-01-15 14:30',
      status: 'success',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'New York, USA',
      ip: '192.168.1.2',
      date: '2024-01-14 09:15',
      status: 'success',
      current: false
    },
    {
      id: 3,
      device: 'Firefox on macOS',
      location: 'Los Angeles, USA',
      ip: '10.0.0.1',
      date: '2024-01-12 18:45',
      status: 'success',
      current: false
    },
    {
      id: 4,
      device: 'Chrome on Android',
      location: 'Unknown',
      ip: '203.0.113.1',
      date: '2024-01-10 22:30',
      status: 'failed',
      current: false
    }
  ]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({
        fullName: userData.fullName,
        email: userData.email,
        username: userData.username
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    setUserData({
      ...userData,
      ...editForm
    });
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    alert('Password changed successfully!');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setUserData({
            ...userData,
            profilePicture: result
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) {
      return <Smartphone className={styles.deviceIcon} />;
    }
    return <Monitor className={styles.deviceIcon} />;
  };

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
              <button
                onClick={() => setActiveTab('sessions')}
                className={`${styles.tabButton} ${activeTab === 'sessions' ? styles.tabButtonActive : styles.tabButtonInactive}`}
              >
                Login History
              </button>
            </nav>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Profile Information</h2>
                <button
                  onClick={handleEditToggle}
                  className={styles.editButton}
                >
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
                    {isEditing && (
                      <label className={styles.profilePictureOverlay}>
                        <Camera className={styles.cameraIcon} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePictureChange}
                          className={styles.hiddenInput}
                        />
                      </label>
                    )}
                  </div>
                  {isEditing && (
                    <div className={styles.profilePictureInfo}>
                      <p className={styles.profilePictureText}>Click on the image to change your profile picture</p>
                      <p className={styles.profilePictureSubtext}>JPG, PNG or GIF (max 5MB)</p>
                    </div>
                  )}
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

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Username</label>
                  <input
                    type="text"
                    value={isEditing ? editForm.username : userData.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    disabled={!isEditing}
                    className={`${styles.input} ${!isEditing ? styles.inputDisabled : ''}`}
                  />
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className={styles.saveButtonContainer}>
                  <button
                    onClick={handleSaveProfile}
                    className={styles.saveButton}
                  >
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

                <button
                  onClick={handlePasswordChange}
                  className={styles.changePasswordButton}
                >
                  Change Password
                </button>
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className={styles.tabContent}>
              <h2 className={styles.sectionTitle}>Login History & Active Sessions</h2>

              <div className={styles.sessionsList}>
                {loginHistory.map((session) => (
                  <div
                    key={session.id}
                    className={`${styles.sessionCard} ${
                      session.current 
                        ? styles.sessionCardCurrent
                        : session.status === 'failed'
                        ? styles.sessionCardFailed
                        : styles.sessionCardNormal
                    }`}
                  >
                    <div className={styles.sessionContent}>
                      <div className={styles.sessionInfo}>
                        <div className={`${styles.deviceIconContainer} ${
                          session.current 
                            ? styles.deviceIconCurrent
                            : session.status === 'failed'
                            ? styles.deviceIconFailed
                            : styles.deviceIconNormal
                        }`}>
                          {getDeviceIcon(session.device)}
                        </div>
                        <div className={styles.sessionDetails}>
                          <div className={styles.sessionHeader}>
                            <h3 className={styles.deviceName}>{session.device}</h3>
                            {session.current && (
                              <span className={styles.currentSessionBadge}>
                                Current Session
                              </span>
                            )}
                            {session.status === 'failed' && (
                              <span className={styles.failedSessionBadge}>
                                Failed Login
                              </span>
                            )}
                          </div>
                          <div className={styles.sessionMeta}>
                            <div className={styles.sessionMetaItem}>
                              <MapPin className={styles.metaIcon} />
                              {session.location}
                            </div>
                            <div className={styles.sessionMetaItem}>
                              <Calendar className={styles.metaIcon} />
                              {session.date}
                            </div>
                            <span className={styles.sessionIp}>IP: {session.ip}</span>
                          </div>
                        </div>
                      </div>
                      {!session.current && session.status !== 'failed' && (
                        <button className={styles.revokeButton}>
                          Revoke
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.securityTip}>
                <h4 className={styles.securityTipTitle}>Security Tip</h4>
                <p className={styles.securityTipText}>
                  If you see any suspicious activity or unrecognized devices, change your password immediately and revoke those sessions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}