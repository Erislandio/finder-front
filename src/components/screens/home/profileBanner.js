import React, { useContext, useCallback } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { UserContext } from "./userProvider";
import { useToasts } from "react-toast-notifications";
import { useDropzone } from "react-dropzone";
import { uploadProfileBanner } from "./utils";

export const ProfileBanner = () => {
  const { user, setUser } = useContext(UserContext);
  const { email, token, image } = user;
  const { addToast } = useToasts();

  const onDropProfileBanner = useCallback(acceptedFiles => {
    uploadProfileBanner(acceptedFiles, email, token, addToast, setUser);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropProfileBanner,
    accept: "image/jpeg, image/png"
  });

  return (
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
  );
};
