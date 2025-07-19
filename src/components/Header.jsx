import React, { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function Header({ user }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleLogout = () => {
    signOut(auth);
    setOpen(false);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <span role="img" aria-label="Pulse Logo">🌐</span> Pulse
      </div>
      <div className="header-search">
        <input
          type="text"
          placeholder="Search…"
          className="header-search-input"
        />
      </div>
      <div className="header-avatar" ref={menuRef}>
        <button
          className="header-avatar-btn"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open user menu"
        >
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="header-avatar-img" />
          ) : (
            <div className="header-avatar-placeholder">
              {user?.displayName?.[0] || "U"}
            </div>
          )}
        </button>
        {open && (
          <div className="header-dropdown">
            <div className="header-dropdown-user">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="header-dropdown-img" />
              ) : (
                <div className="header-dropdown-placeholder">
                  {user?.displayName?.[0] || "U"}
                </div>
              )}
              <div>
                <div className="header-dropdown-name">{user?.displayName || "User"}</div>
                <div className="header-dropdown-email">{user?.email}</div>
              </div>
            </div>
            <button className="header-dropdown-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}