import React from "react";
import Auth from "../components/Auth";

function Authenticate({ setIsLoggedIn, isLoggedIn }) {
  return (
    <>
      <Auth isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}

export default Authenticate;
