import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Logan",
      image:
        "https://cdn.vox-cdn.com/thumbor/qRuc38cqdqyO0MS7cnb4IPAOAmQ=/0x0:1900x956/1820x1213/filters:focal(798x326:1102x630):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67382779/Wolverine_fortnite.0.jpg",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
