import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import AddSource from "./AddSource";
import Feed from "./Feed";

export default function Dashboard({ user }) {
  const [sources, setSources] = useState([]);

  const logout = () => {
    signOut(auth);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Welcome, {user.displayName}</h2>
        <button onClick={logout} className="dashboard-logout-btn">
          Logout
        </button>
      </div>

      <AddSource setSources={setSources} />
      <Feed sources={sources} />

    </div>
  );
}
