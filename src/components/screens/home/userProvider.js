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

    const userId = auth.id;
    const token = auth.token;
    const provider = auth.provider;

    console.log(userId)

    const url = provider ? "/provider" : "/user";

    api
      .get(url, {
        params: {
          id: userId
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(({ data }) => {
        console.log(data);

        setUser({
          ...data,
          token
        });

        if (provider) {
          return props.history.push("/dashboard");
        }
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
