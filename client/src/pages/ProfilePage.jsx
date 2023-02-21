import React, { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/UserContext";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import Spinner from "../components/Spinner";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/user/logout");
    setUser(null);
    setRedirect("/");
  };

  if (!ready) {
    return <Spinner />;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email})
          <br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
