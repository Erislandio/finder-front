import React from "react";
import "./details.css";
import { useProvider } from "../hooks/useProvider";
import Loader from "react-loader-spinner";
import { IoIosArrowBack } from "react-icons/io";

export const Details = props => {
  console.log(props);

  const id = props.match.params.id;

  if (!id) {
    props.history.push("/home");
  }

  const { data, loading, error } = useProvider(id);

  if (loading || error || !data) {
    return <Loader type="TailSpin" color="#fff" height={18} width={18} />;
  }
  const profilePicture = data.image
    ? `url(${data.image})`
    : "url(https://www.landscapingbydesign.com.au/wp-content/uploads/2018/11/img-person-placeholder.jpg)";

  const backgroundImage = data.banner
    ? `url(${data.banner})`
    : "url(https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)";

  return (
    <section id="details">
      <main className="details">
        <div className="banner" style={{ backgroundImage }}>
          <IoIosArrowBack
            className="back-button"
            color="#fff"
            opacity="0.8"
            size={30}
            onClick={() => props.history.push("/home")}
          />
          <div
            className="user-logo"
            style={{ background: profilePicture }}
          ></div>
        </div>
        <div className="info">
          <h1>{data.fancyName}</h1>
          <h4>email: {data.email}</h4>
          <h4>phone: {data.phone}</h4>
        </div>

        <div className="aval">
          <h1>Avaliações dos usuários</h1>
        </div>
      </main>
    </section>
  );
};
