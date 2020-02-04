import React, { useState } from "react";
import { Container } from "../../utils/container/container";
import "./login.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { api } from "../../../service/api";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import cookie from "js-cookie";

export const Login = ({ history }) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { addToast } = useToasts();

  const handleSubmit = async e => {
    setUser({ ...user, loading: true });
    e.preventDefault();
    try {
      const { data } = await api.post("/login", {
        ...user
      });

      if (data.error) {
        return addToast(data.message, {
          appearance: "error"
        });
      }

      if (data.user) {
        cookie.set("user", JSON.stringify(data.user));
        history.push("/home");
      }
    } catch (error) {
      return addToast("Não foi possível fazer o login no momento", {
        appearance: "error"
      });
    }
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value
    });
  };

  return (
    <Container id="login">
      <div className="logo">
        <FaMapMarkerAlt color="#fade11" size="29" />
        <h3>Finder</h3>
      </div>
      <main className="wrapper">
        <div className="title-page">
          <h1>Login</h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <span className="default-input">
            <label>Email</label>
            <input
              placeholder="Email"
              value={user.email}
              name="email"
              type="email"
              onChange={handleChange}
              required
            />
          </span>
          <span className="default-input">
            <label>Password</label>
            <input
              placeholder="Password"
              value={user.password}
              name="password"
              onChange={handleChange}
              required
              type="password"
            />
          </span>
          <span className="default-button">
            <button disabled={user.loading} type="submit">
              Entrar
            </button>
          </span>
          <Link className="link" to="/signin">
            Não tem conta?
          </Link>
        </form>
      </main>
    </Container>
  );
};
