import React, { useContext, useCallback } from "react";
import { MdExitToApp, MdLocalPhone, MdAddAPhoto } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import cookie from "js-cookie";
import { UserContext } from "./userProvider";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

export const Sidebar = ({ history }) => {
  const { user, setUser } = useContext(UserContext);
  const { email, lastname, phone, name, token, image } = user;
  const { addToast } = useToasts();

  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData();
    formData.set("file", acceptedFiles[0]);

    console.log(acceptedFiles[0]);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .post("https://whispering-headland-58237.herokuapp.com/file", formData)
      .then(({ data: { url } }) => {
        axios
          .patch("https://whispering-headland-58237.herokuapp.com/user/image", {
            email,
            image: url
          })
          .then(({ data: user }) => {
            setUser(user);
            return addToast("Foto atualizada com sucesso!", {
              appearance: "success"
            });
          });
      })
      .catch(() => {
        return addToast(
          "Não foi possível atualizar a imagem  no momento, tente novamente mais tarde",
          {
            appearance: "error"
          }
        );
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png"
  });

  const handleLogout = () => {
    cookie.remove("user");
    history.push("/");
  };

  const backgroundImage = image
    ? `url(https://whispering-headland-58237.herokuapp.com${image})`
    : "url(https://www.landscapingbydesign.com.au/wp-content/uploads/2018/11/img-person-placeholder.jpg)";

  return (
    <>
      <div className="banner">
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <MdAddAPhoto
                className="banner-change"
                color="#fff"
                opacity="0.8"
                size={30}
              />
            ) : (
              <MdAddAPhoto
                className="banner-change"
                color="#fff"
                opacity="0.8"
                size={30}
              />
            )}
          </div>
        </div>
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <div
                className="user-logo"
                style={{ background: backgroundImage }}
              ></div>
            ) : (
              <div
                className="user-logo"
                style={{ background: backgroundImage }}
              ></div>
            )}
          </div>
        </div>
      </div>
      <div className="user-description">
        <h2>{`${name} ${lastname}`}</h2>
        <h3>{email}</h3>
        <h3>
          <MdLocalPhone color="#2ecc71" />
          {phone}
        </h3>
      </div>
      <div className="button-container">
        <button className="see-more">
          Ver mais
          <IoIosArrowForward size={15} color="#fff" />
        </button>
        <button className="logout" onClick={handleLogout}>
          Sair
          <MdExitToApp size={20} color="#fff" />
        </button>
      </div>
    </>
  );
};
