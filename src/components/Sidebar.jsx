// Sidebar.js
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";
    
export default function Sidebar({ onSelect }) {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    async function fetchSources() {
      const db = getFirestore();
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setSources(userSnap.data().sources || []);
      }
    }
    fetchSources();
  }, []);

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Sources</h3>
      <ul className="sidebar-list">
        {sources.map((s, i) => (
          <li
            key={i}
            className="sidebar-list-item"
            onClick={() => onSelect(s)}
            tabIndex={0}
          >
            {s}
          </li>
        ))}
      </ul>
    </aside>
  );
}
