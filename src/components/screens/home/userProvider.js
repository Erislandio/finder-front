import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import { api } from "../../../service/api";
import Loader from "react-loader-spinner";
export const UserContext = React.createContext();

export const userProvider = Component => props => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const hash = cookie.get("user").replace(/%22/g, '"');
    const auth = JSON.parse(hash);

    const userId = auth.token.id;
    const token = auth.token.token;

    api
      .get("/user", {
        params: {
          id: userId
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(({ data }) => {
        setUser({
          ...data,
          token
        });
      });
  }, []);

  if (!user) {
    return <Loader type="TailSpin" color="#fff" height={18} width={18} />;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...props} user={user} setUser={setUser} />
    </UserContext.Provider>
  );
};
