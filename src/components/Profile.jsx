import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../styles/profile.css";
function Profile() {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const profileUser = async (values) => {
      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        // const response = await fetch("/api/profile");

        if (response.ok) {
          const data = await response.json();
          setInfo(data.user);
          console.log(data.user);
          return true;
        } else {
          navigate("/login");
          throw new Error("Fetching profile failed");
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
        throw new Error("Fetching profile failed");
      }
    };
    profileUser();
  }, []);

  function handleLogout() {
    const logout = async () => {
      try {
        const response = await fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Clear session data and redirect to the login page
          navigate("/login");
        } else {
          throw new Error("Logout failed");
        }
      } catch (err) {
        console.error(err);
        // Handle error
      }
    };

    logout();
  }

  return (
    <div className="p-container">
      <div className="logout-cont">
        <button onClick={handleLogout} className="log-out">
          Log Out
        </button>
      </div>
      <div className="p-profile">
        <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" />
        <div className="info">
          <div className="fur-info">
            <h1>
              {info.firstname} {info.lastname}
            </h1>
          </div>
          <h3>{info.email}</h3>
        </div>
      </div>
    </div>
  );
}

export default Profile;
