import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // for smooth transitions

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      {user ? <Dashboard user={user} /> : <Login />}
      {user ? <Sidebar user={user} /> : <Login />}
    </div>
  );
}

export default App;
