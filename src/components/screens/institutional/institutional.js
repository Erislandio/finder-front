import React from "react";
import "./institutional.css";
import {
  FaMapMarkerAlt,
  FaMapMarkedAlt,
  FaStar,
  FaGrinStars
} from "react-icons/fa";
import { Link } from "react-router-dom";

export const Institutional = () => {
  return (
    <div className="institutional">
      <header className="header-institutional">
        <span
          className="logo"
          style={{ display: "flex", alignItems: "center" }}
        >
          <h1>FINDER</h1>
          <FaMapMarkerAlt size="20" color="#fff" />
        </span>
        <Link to="/login">Login</Link>
      </header>
      <main className="main">
        <div className="description">
          <h3>Conectando clientes com provedores de serviços</h3>
        </div>
        <div className="subscribe">
          <h4>Inscreva-se</h4>
          <div>
            <button>
              <Link to="/signin">Sou cliente</Link>
            </button>
            <button>
              <Link to="/provider">Sou provedor</Link>
            </button>
          </div>
        </div>
        <div className="card">
          <FaMapMarkedAlt color="#f9b411" size="50" />
          <h4 className="title">Mapas</h4>
          <span>Utilizamos mapas para facilitar a sua vida</span>
        </div>
        <div className="card">
          <FaStar color="#f9b411" size="50" />
          <h4 className="title">Avaliações</h4>
          <span>Sistema de avaliações</span>
        </div>
        <div className="card">
          <FaGrinStars color="#f9b411" size="50" />
          <h4 className="title">Facilidade</h4>
          <span>Encontre com facilidade oque precisa</span>
        </div>
      </main>
      <footer className="footer">
        <ul>
          <li>Minha conta</li>
          <li>Login</li>
          <li>Provedores</li>
        </ul>
      </footer>
    </div>
  );
};
