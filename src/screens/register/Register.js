import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseUtills";
export const Register = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validateInput(input));
  };
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const validateInput = (inputValues) => {
    let inputErrors = {};
    if (!inputValues.firstName) {
      inputErrors.firstName = "First Name is Required !";
    }
    if (!inputValues.lastName) {
      inputErrors.lastName = "Last Name is Required !";
    }
    if (!inputValues.email) {
      inputErrors.email = "Email is Required !";
    }
    if (!isEmailValid(inputValues.email)) {
      inputErrors.email = "Valid Email is Required !";
    } else if (!inputValues.contact) {
      inputErrors.contact = "Contact is Required !";
    }
    if (!isNumberValid(inputValues.contact)) {
      inputErrors.contact = "Valid Contact is Required !";
    }
    if (!inputValues.password) {
      inputErrors.password = "Password is Required !";
    }
    if (!isPasswordValid(inputValues.password)) {
      inputErrors.password =
        "Password must has at least 8 characters that include atleast 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*) !";
    }
    if (!inputValues.confirmPassword) {
      inputErrors.confirmPassword = "Confirm Password is Required !";
    }
    if (inputValues.password !== inputValues.confirmPassword) {
      inputErrors.confirmPassword = "passwords do not match !";
    }
    return inputErrors;
  };

  const register = (e) => {
    e.preventDefault();
    setSubmit(true);
    try {
      createUserWithEmailAndPassword(auth, input.email, input.password)
        .then(async (res) => {
          const user = res.user;
          await updateProfile(user, { displayName: input.email });
          navigate("/");
          setCurrentUser(true);
        })
        .catch((err) => {
          console.log(err);
          if (err === "auth/invalid-email") {
            alert("Invalid email");
          }
        });
    } catch (error) {
      alert(error);
    }
  };
  const isPasswordValid = (password) => {
    const re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return re.test(password);
  };

  function isEmailValid(email) {
    const regExp =
      /^(([^<>()\[\]\\.,;:\s@"A-Z]+(\.[^<>()\[\]\\.,;:\s@"A-Z]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
    return regExp.test(email);
  }

  function isNumberValid(contact) {
    const numbers = /^[6-9](?!.*(\d)(?:-?\1){3,})\d{9}$/;
    return numbers.test(contact);
  }
  const isDisable = () => {
    if (input.firstName && input.lastName && isEmailValid(input.email) && isPasswordValid(input.password) && isNumberValid(input.contact) && input.confirmPassword && input.password===input.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="page-wrapper bg-gra-02 p-t-130 p-b-100">
      <div className="wrapper wrapper--w680">
        <div className="card card-4">
          <div className="card-body">
            <h2 className="title">Registration Form</h2>
            {Object.keys(errors).length === 0 && submit ? (
              <span className="success">Successfully Submitted</span>
            ) : null}
            <form onSubmit={register} name="form">
              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">first name</label>
                    <input
                      className="input--style-4"
                      type="text"
                      name="firstName"
                      value={input.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName ? (
                      <p className="error">{errors.firstName}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">last name</label>
                    <input
                      className="input--style-4"
                      type="text"
                      name="lastName"
                      value={input.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName ? (
                      <p className="error">{errors.lastName}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">Email</label>
                    <div className="input-group-icon">
                      <input
                        className="input--style-4 js-datepicker"
                        type="text"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                      />
                      {errors.email ? (
                        <p className="error">{errors.email}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="col-2">
                  <div className="input-group">
                    <label className="label">Contact</label>
                    <input
                      className="input--style-4"
                      type="text"
                      name="contact"
                      value={input.contact}
                      onChange={handleChange}
                    />
                    {errors.contact ? (
                      <p className="error">{errors.contact}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">Password</label>
                    <input
                      className="input--style-4"
                      type="password"
                      name="password"
                      value={input.password}
                      onChange={handleChange}
                    />
                    {errors.password ? (
                      <p className="error">{errors.password}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">Confirm Password</label>
                    <input
                      className="input--style-4"
                      type="password"
                      name="confirmPassword"
                      value={input.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword ? (
                      <p className="error">{errors.confirmPassword}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <div className="input-group">
                    <label className="label">Address</label>
                    <input
                      className="input--style-4"
                      type="text"
                      name="address"
                      value={input.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="p-t-15">
                <button
                  disabled={!isDisable()}
                  className="btn btn--radius-2 btn--blue"
                  type="submit"
                  name="sub"
                >
                  Submit
                </button>
                <p>
                  Already have an Account ?{" "}
                  <span>
                    <Link to={"/"}>Login</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
