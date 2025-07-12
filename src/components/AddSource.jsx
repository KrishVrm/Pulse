import React, { useState } from "react";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";

const db = getFirestore();

async function saveSource(newSource) {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const existing = userSnap.data().sources || [];
    await updateDoc(userRef, {
      sources: [...new Set([...existing, newSource])],
    });
  } else {
    await setDoc(userRef, { sources: [newSource] });
  }
}

export default function AddSource({ setSources }) {
  const [input, setInput] = useState("");

  const handleAdd = async () => {
    const trimmed = input.trim();
    if (trimmed !== "") {
      setSources(prev => [...prev, trimmed]);
      await saveSource(trimmed);
      setInput("");
    }
  };

  return (
    <div className="add-source">
      <input
        type="text"
        placeholder="Enter subreddit or @handle"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="add-source-input"
      />
      <button onClick={handleAdd} className="add-source-btn">
        Add Source
      </button>
    </div>
  );
}
