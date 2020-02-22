import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
const UserContext = React.createContext();

export const userProvider = Component => props => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const hash = cookie.get("user").replace(/%22/g, '"');
    const { token } = JSON.parse(hash);

    console.log(token);
  }, [user]);

  return (
    <UserContext.Provider value={{ none: true }}>
      <Component {...props} />
    </UserContext.Provider>
  );
};
