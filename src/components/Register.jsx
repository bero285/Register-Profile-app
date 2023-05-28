import React, { useEffect } from "react";
import { useState } from "react";
import { Formik } from "formik";
import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register(props) {
  const navigate = useNavigate();
  const [emState, setEmState] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setEmState(false);
    }, 3000);
  }, [emState]);
  const registerUser = async (values) => {
    try {
      const response = await fetch("/api/register", {
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
        // localStorage.setItem("id", id);

        return true;
      } else {
        setEmState(true);
        throw new Error("Register failed");
      }
    } catch (err) {
      console.error(err);
      throw new Error("Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="form-cont">
        <h1>Register</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            password2: "",
            firstName: "",
            lastName: "",
          }}
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
            if (!values.password2) {
              errors.password2 = "required";
            } else if (values.password2 !== values.password) {
              errors.password2 = "Invalid password";
            }
            if (!values.firstName) {
              errors.firstName = "Required";
            }
            if (!values.lastName) {
              errors.lastName = "Required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            // axios
            //   .post("/api/register", values)
            //   .then((response) => {
            //     alert("Registration successful");
            //     setSubmitting(false);
            //   })
            //   .catch((error) => {
            //     console.error(error);
            //     alert("Registration failed");
            //     setSubmitting(false);
            //   });

            try {
              await registerUser(values);
              // alert(values);

              // console.log(values);
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
            <form onSubmit={handleSubmit} className="inputCont">
              {emState ? (
                <h3 className="inc-text">Incorrect or used Email</h3>
              ) : null}
              <div className="nameContainer">
                <div className="inp-cont">
                  <input
                    className="name-input"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  <div className="label-cont">
                    <h2>First Name</h2>
                    <h3>
                      {errors.firstName &&
                        touched.firstName &&
                        errors.firstName}
                    </h3>
                  </div>
                </div>
                <div className="inp-cont">
                  <input
                    className="name-input"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.secondName}
                  />
                  <div className="label-cont">
                    <h2>Last name</h2>
                    <h3>
                      {errors.lastName && touched.lastName && errors.lastName}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="inp-cont">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <div className="label-cont">
                  <h2>Email</h2>
                  <h3>{errors.email && touched.email && errors.email}</h3>
                </div>
              </div>
              <div className="inp-cont">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className="label-cont">
                  <h2>Password</h2>
                  <h3>
                    {errors.password && touched.password && errors.password}
                  </h3>
                </div>
              </div>

              <div className="inp-cont">
                <input
                  type="password"
                  name="password2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password2}
                />
                <div className="label-cont">
                  <h2>Repeat the password</h2>
                  <h3>
                    {errors.password2 && touched.password2 && errors.password2}
                  </h3>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              <Link to="/login">
                <h3 className="login-text">already have account? Login</h3>
              </Link>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
