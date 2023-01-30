import React, { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  };

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  const linkClases = (type = null) => {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link className={linkClases("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClases("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClases("places")} to={"/account/places"}>
          My accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email})
          <br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
