import React, { useState } from "react";
import { Container } from "../../utils/container/container";
import { FaMapMarkerAlt } from "react-icons/fa";
import { api } from "../../../service/api";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import cookie from "js-cookie";
import { ButtonDefault } from "../../utils/button/buttonDefault";
import { InputDefault } from "../../utils/input/inputDefault";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./signin.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export const SignIn = ({ history }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    document: "",
    lastname: "",
    name: "",
    loading: false
  });

  const [phone, setPhone] = useState("");

  const { addToast } = useToasts();

  const handleSubmit = async e => {
    cookie.remove("user");
    setUser({ ...user, loading: true });
    e.preventDefault();
    try {
      const { data } = await api.post("/user", {
        ...user,
        phone
      });

      if (data.error) {
        return addToast(data.message, {
          appearance: "error"
        });
      }

      if (data) {
        api
          .post("/login", {
            email: user.email,
            password: user.password
          })
          .then(res => {
            const token = res.token;
            const id = res._id;

            cookie.set("user", {
              token,
              id
            });
            history.push("/home");
          })
          .catch(error => {
            return addToast(error, {
              appearance: "error"
            });
          })
          .finally(() => {
            setUser({ ...user, loading: false });
          });
      }
    } catch (error) {
      console.log(error);
      setUser({ ...user, loading: false });
      return addToast("Não foi possível fazer o cadastro momento", {
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
    <Container id="login" className="signin">
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
        <form onSubmit={handleSubmit}>
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
              type="text"
              required
              value={user.name}
              onChange={handleChange}
              name="name"
              placeholder="Nome"
            />
            <InputDefault
              type="text"
              required
              value={user.lastname}
              onChange={handleChange}
              name="lastname"
              placeholder="Sobrenome"
            />
            <InputDefault
              type="text"
              required
              value={user.document}
              onChange={handleChange}
              name="document"
              placeholder="CPF"
            />
            <PhoneInput
              placeholder="Número de telefone"
              value={phone}
              onChange={setPhone}
              country="BR"
              defaultCountry="BR"
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
          <ButtonDefault id="login-btn" type="submit" onClick={() => {}}>
            {user.loading ? (
              <Loader type="TailSpin" color="#fff" height={18} width={18} />
            ) : (
              "Cadastrar"
            )}
          </ButtonDefault>
        </form>
        <Link to="/login">Login</Link>
      </main>
    </Container>
  );
};
