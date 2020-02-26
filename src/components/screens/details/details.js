import React, { useContext } from "react";
import "./details.css";
import { useProvider } from "../hooks/useProvider";
import Loader from "react-loader-spinner";
import { IoIosArrowBack, IoIosStar } from "react-icons/io";
import { userProvider } from "../home/userProvider";
import { FaRegEdit } from "react-icons/fa";

const Details = props => {
  const {
    user: { _id },
    match: {
      params: { id }
    }
  } = props;

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

  const renderStars = num => {
    const stars = [];

    for (let index = 0; index < num; index++) {
      stars.push(index);
    }

    return stars;
  };

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

        <form className="aval-form">
          {data.assessments.map(item => {
            const stars = renderStars(item.stars);

            console.log(stars);

            return (
              <div className="aval-card" key={item.user.id}>
                <div>
                  {item.user.id === _id ? (
                    <span className="btn-edit">
                      <FaRegEdit size={20} color="#dedede" />
                    </span>
                  ) : null}
                  <img src={item.user.image} alt={item.user.name} />
                  <div>
                    <h3>{item.user.name}</h3>
                    {stars.map(star => {
                      return <IoIosStar key={star} color="#FFDF00" size={10} />;
                    })}
                    <h4>{item.title}</h4>
                    <p>{item.comment}</p>
                    <span></span>
                  </div>
                </div>
              </div>
            );
          })}
        </form>
      </main>
    </section>
  );
};

export default userProvider(Details);
