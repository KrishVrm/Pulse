import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";
import AddSource from "./AddSource";
import Feed from "./Feed";

const db = getFirestore();

export default function Dashboard({ user }) {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setSources(userSnap.data().sources || []);
        }
      } catch (err) {
        console.error("Error fetching user sources:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  if (loading) return <p>Loading your saved sources...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Welcome, {user.displayName}</h2>
      </div>
      <AddSource setSources={setSources} />
      <Feed sources={sources} />
    </div>
  );
}
