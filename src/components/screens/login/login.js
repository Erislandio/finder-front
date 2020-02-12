import React, { useState } from "react";
import { Container } from "../../utils/container/container";
import "./login.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { api } from "../../../service/api";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import cookie from "js-cookie";
import { ButtonDefault } from "../../utils/button/buttonDefault";
import { InputDefault } from "../../utils/input/inputDefault";

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
      <main className="main-login">
        <div className="title">
          <span
            className="logo"
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1>FINDER</h1>
            <FaMapMarkerAlt size="40" />
          </span>
        </div>
        <div></div>
        <div className="input-center">
          <InputDefault
            type="email"
            required
            value={user.email}
            onChange={handleChange}
            name="email"
            placeholder="Email"
          />
          <InputDefault
            type="password"
            required
            value={user.password}
            onChange={handleChange}
            name="password"
            placeholder="Password"
          />
        </div>
        <ButtonDefault id="login-btn" type="submit" onClick={handleSubmit}>
          Seguir
        </ButtonDefault>
        <div className="link-container-group">
          <Link to="/signin">Não tem conta?</Link>
        </div>
      </main>
    </Container>
  );
};
