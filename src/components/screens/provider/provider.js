import React, { useState } from "react";
import { Container } from "../../utils/container/container";
import { FaMapMarkerAlt } from "react-icons/fa";
import { api } from "../../../service/api";
import { useToasts } from "react-toast-notifications";
import cookie from "js-cookie";
import { ButtonDefault } from "../../utils/button/buttonDefault";
import { InputDefault } from "../../utils/input/inputDefault";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "../signin/signin.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export const Provider = ({ history }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    document: Math.random(),
    lastname: "",
    fancyName: "",
    name: "",
    loading: false,
    type: null
  });

  const [phone, setPhone] = useState("");

  const { addToast } = useToasts();
  console.log(user);

  const handleSubmit = async e => {
    cookie.remove("user");
    setUser({ ...user, loading: true });
    e.preventDefault();
    try {
      const { data } = await api.post("/provider", {
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
          .then(({ data }) => {
            const token = data.token;
            const id = data.user._id;
            const provider = data.provider;

            cookie.set("user", {
              token,
              id,
              provider
            });
            history.push("/provider/step1");
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
              value={user.fancyName}
              onChange={handleChange}
              name="fancyName"
              placeholder="Nome do seu negócio"
            />
            <InputDefault
              type="text"
              required
              value={user.name}
              onChange={handleChange}
              name="name"
              placeholder="Nome do proprietário"
            />
            <InputDefault
              type="text"
              required
              value={user.lastname}
              onChange={handleChange}
              name="lastname"
              placeholder="Sobrenome do proprietário"
            />
            <select
              className="select-default"
              onChange={e => setUser({ ...user, type: e.target.value })}
            >
              {!user.type && (
                <option defaultValue="none" defaultChecked>
                  Tipo de serviço
                </option>
              )}
              <option value="Moto Taxi">Moto taxi</option>
              <option value="Mecânica">Mecânica</option>
              <option value="Manicure e pedicure">Manicure e Pedicure</option>
              <option value="CabeleireiroOPR">Cabeleireiro</option>
              <option value="Supermercado">Supermercado</option>
              <option value="Pedreiro">Pedreiro</option>
              <option value="Carpinteiro">Carpinteiro</option>
              <option value="Pintor">Pintor</option>
              <option value="Encanador">Encanador</option>
              <option value="Restaurante">Restaurante</option>
              <option value="Mercearia">Mecearia</option>
            </select>
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
              "Próximo passo "
            )}
          </ButtonDefault>
        </form>
      </main>
    </Container>
  );
};
