import React, { useContext, useCallback } from "react";
import { MdExitToApp, MdLocalPhone } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import cookie from "js-cookie";
import { UserContext } from "./userProvider";
import { useDropzone } from "react-dropzone";
import { useToasts } from "react-toast-notifications";
import { uploadProfilePicture } from "./utils";
import { ProfileBanner } from "./profileBanner";

export const Sidebar = ({ history }) => {
  const { user, setUser } = useContext(UserContext);
  const { email, lastname, phone, name, token, image, banner } = user;
  const { addToast } = useToasts();

  const onDropProfilePicture = useCallback(acceptedFiles => {
    uploadProfilePicture(acceptedFiles, email, token, addToast, setUser);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropProfilePicture,
    accept: "image/jpeg, image/png"
  });

  const handleLogout = () => {
    cookie.remove("user");
    history.push("/");
  };

  const profilePicture = image
    ? `url(${image})`
    : "url(https://www.landscapingbydesign.com.au/wp-content/uploads/2018/11/img-person-placeholder.jpg)";

  const backgroundImage = banner
    ? `url(${banner})`
    : "url(https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)";

  return (
    <>
      <div className="banner" style={{ backgroundImage }}>
        <div>
          <ProfileBanner />
        </div>
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <div
                className="user-logo"
                style={{ background: profilePicture }}
              ></div>
            ) : (
              <div
                className="user-logo"
                style={{ background: profilePicture }}
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
