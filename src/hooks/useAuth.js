import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebaseConfig"; 

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false); 
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return { user, loading };
};
