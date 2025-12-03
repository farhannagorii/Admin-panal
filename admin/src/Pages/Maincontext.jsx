import React, { createContext, useEffect, useState } from "react";

export const loginContext = createContext();

function Maincontext({ children }) {
  const [user, setuser] = useState(() => {
    try {
      const stored = localStorage.getItem("USER");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Invalid USER JSON", e);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("USER"); // Important for logout
    }
  }, [user]);

  const value = { user, setuser };

  return (
    <loginContext.Provider value={value}>
      {children}
    </loginContext.Provider>
  );
}

export default Maincontext;