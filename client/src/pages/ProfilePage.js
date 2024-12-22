import React, { useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150" // Default placeholder image
  );
  const [userInfo, setUserInfo] = useState({
    username: "Nora Tsunoda",
    email: "nora@example.com",
    dob: "1990-01-01",
    location: "New York, USA",
    accountCreated: "2023-01-15",
    lastLogin: "2024-12-18",
    accountStatus: "Active",
    socialLinks: {
      facebook: "https://facebook.com/nora",
      twitter: "https://twitter.com/nora",
      linkedin: "https://linkedin.com/in/nora",
    },
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`profile-container ${darkMode ? "dark" : "light"}`}>
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-picture">
          <img src={profileImage} alt="Profile" />
          <label className="upload-btn">
            Upload Photo
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>
        <div className="user-details">
          <h2>{userInfo.username}</h2>
          <p>{userInfo.accountStatus} - Security Lead</p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="theme-toggle">
        <label>
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </label>
      </div>

      {/* Profile Information */}
      <div className="profile-sections">
        <div className="section">
          <h3>Account Details</h3>
          <ul>
            <li>Email: {userInfo.email}</li>
            <li>Date of Birth: {userInfo.dob}</li>
            <li>Location: {userInfo.location}</li>
            <li>Account Created: {userInfo.accountCreated}</li>
            <li>Last Login: {userInfo.lastLogin}</li>
            <li>Status: {userInfo.accountStatus}</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="section">
          <h3>Social Links</h3>
          <ul>
            <li>
              Facebook: <a href={userInfo.socialLinks.facebook}>Profile</a>
            </li>
            <li>
              Twitter: <a href={userInfo.socialLinks.twitter}>Profile</a>
            </li>
            <li>
              LinkedIn: <a href={userInfo.socialLinks.linkedin}>Profile</a>
            </li>
          </ul>
        </div>

        {/* Security Settings */}
        <div className="section">
          <h3>Security Settings</h3>
          <ul>
            <li>Change Password</li>
            <li>Two-Factor Authentication: Enabled</li>
            <li>Change Security Pin</li>
            <li>Log Out of All Devices</li>
          </ul>
        </div>

        {/* Privacy & Notifications */}
        <div className="section">
          <h3>Privacy & Notifications</h3>
          <ul>
            <li>Email Notifications: Enabled</li>
            <li>Data Privacy: Manage Settings</li>
            <li>Cookie Preferences: Accept All</li>
          </ul>
        </div>

        {/* Theme & Appearance */}
        <div className="section">
          <h3>Theme & Appearance</h3>
          <ul>
            <li>Dark Mode: {darkMode ? "On" : "Off"}</li>
            <li>Language: English</li>
          </ul>
        </div>

        {/* Account Management */}
        <div className="section">
          <h3>Account Management</h3>
          <ul>
            <li>Deactivate Account</li>
            <li>Delete Account</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

