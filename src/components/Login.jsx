import React from "react";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
function Login(props) {
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [emState, setEmState] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setEmState(false);
    }, 3000);
  }, [emState]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/login");

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setInfo(data.user);
          } else {
            navigate("/login"); // Redirect to login page if unauthorized
          }
        } else {
          throw new Error("Fetching profile failed");
        }
      } catch (error) {
        console.error(error);
        navigate("/login"); // Redirect to login page if an error occurs
      }
    };

    fetchProfile();
  }, []);

  const loginUser = async (values) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        const id = data.user._id;
        navigate(`/profile/${id}`);
        return true;
      } else {
        setEmState(true);
        throw new Error("Login failed");
      }
    } catch (err) {
      setEmState(true);
      console.error(err);
      throw new Error("Login failed");
    }
  };

  return (
    <div className="l-container">
      <div className="l-form-cont">
        <h1>ACCOUNT LOGIN</h1>
        {emState ? (
          <h3 className="l-inc-text">Incorrect Email or Password</h3>
        ) : null}
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            try {
              loginUser(values);
            } catch (err) {
              setEmState(true);

              // alert("Registration failed");
            } finally {
              setSubmitting(false);
            }
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className="l-inputCont">
              <div className="l-inp-cont">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="l-input"
                />
                <div className="l-label-cont">
                  <h2>Email</h2>{" "}
                  <h3>{errors.email && touched.email && errors.email}</h3>
                </div>
              </div>
              <div className="l-inp-cont">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="l-input"
                />
                <div className="l-label-cont">
                  <h2>Password</h2>{" "}
                  <h3>
                    {errors.password && touched.password && errors.password}
                  </h3>
                </div>
              </div>

              <button
                className="l-button"
                type="submit"
                disabled={isSubmitting}
              >
                Log In
              </button>
              <Link to="/register">
                <h3 className="register-text">Dont have account? Register</h3>
              </Link>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
