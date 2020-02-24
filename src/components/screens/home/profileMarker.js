import React from "react";

export const ProfileMarker = ({ userImage, name, lastname }) => (
  <div className="user-marker-image">
    <img src={userImage} alt={name} />
    <h3>
      {name} {lastname}
    </h3>
  </div>
);
