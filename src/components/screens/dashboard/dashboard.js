import React, { useCallback, useContext } from "react";
import { userProvider, UserContext } from "../home/userProvider";
import "./dash.css";
import { ButtonDefault } from "../../utils/button/buttonDefault";
import { useDropzone } from "react-dropzone";
import { uploadProviderPicture } from "../home/utils";
import { useToasts } from "react-toast-notifications";
import { ProviderBanner } from "../home/profileBanner";
import { IoIosMenu } from "react-icons/io";

const Dashboard = ({ user }) => {
  const { email, token, image, banner } = user;
  const { setUser } = useContext(UserContext);
  const { addToast } = useToasts();

  const onDropProfilePicture = useCallback(acceptedFiles => {
    uploadProviderPicture(acceptedFiles, email, token, addToast, setUser);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropProfilePicture,
    accept: "image/jpeg, image/png"
  });

  const profilePicture = image
    ? `url(${image})`
    : "url(https://www.landscapingbydesign.com.au/wp-content/uploads/2018/11/img-person-placeholder.jpg)";

  const backgroundImage = banner
    ? `url(${banner})`
    : "url(https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)";

  return (
    <section id="">
      <main>
        <div className="banner" style={{ backgroundImage }}>
          <IoIosMenu
            className="menu-icon"
            color="#fff"
            opacity="0.8"
            size={30}
          />
          <div>
            <ProviderBanner />
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
        <div className="info">
          <h1>{user.fancyName}</h1>
          <h4>email: {user.email}</h4>
          <h4>phone: {user.phone}</h4>
        </div>
        <div className="container-button">
          <ButtonDefault>Visualizar localização</ButtonDefault>
          <ButtonDefault>Editar informações</ButtonDefault>
        </div>

        <div className="aval">
          <h1>Avaliações dos usuários</h1>
        </div>
      </main>
    </section>
  );
};

export default userProvider(Dashboard);
