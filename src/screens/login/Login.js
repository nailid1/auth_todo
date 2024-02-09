import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseUtills";
import { AuthContext } from "../../firebaseUtills";
import "../login/Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
export const Login = ({ user, signIn }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const validateInput = (inputValues) => {
    let inputErrors = {};
    if (!inputValues.email) {
      inputErrors.email = "Email is Required !";
    }
    if (!isEmailValid(inputValues.email)) {
      inputErrors.email = "Valid Email is Required !";
    }
    if (!inputValues.password) {
      inputErrors.password = "Password is Required !";
    }
    if (!isPasswordValid(inputValues.password)) {
      inputErrors.password =
        "Password must has at least 8 characters that include atleast 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*) !";
    }
    return inputErrors;
  };
  const login = (e) => {
    setSubmit(true);
    setErrors(validateInput(input));
    console.log(input);

    try {
      signInWithEmailAndPassword(auth, input.email, input.password)
        .then((res) => {
          const user = res.user;
          // localStorage.setItem("USER", JSON.stringify(user));
          signIn();
          navigate("/dashboard");
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

  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && submit) {
  //     finishLogin();
  //   }
  // }, [errors]);

  function isEmailValid(email) {
    const regExp =
      /^(([^<>()\[\]\\.,;:\s@"A-Z]+(\.[^<>()\[\]\\.,;:\s@"A-Z]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
    return regExp.test(email);
  }
  const isPasswordValid = (password) => {
    const re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return re.test(password);
  };
  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41">Account Login</span>
            <div className="login100-form validate-form p-b-33 p-t-5">
              {Object.keys(errors).length === 0 && submit ? (
                <span className="success">Successfully Submitted</span>
              ) : null}
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter Email"
              >
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={input.email}
                  onChange={handleChange}
                />
                <span
                  className="focus-input100"
                  data-placeholder="&#xe82a;"
                ></span>
                {errors.email ? <p className="error">{errors.email}</p> : null}
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={input.password}
                  onChange={handleChange}
                />
                <span
                  className="focus-input100"
                  data-placeholder="&#xe80f;"
                ></span>
                {errors.password ? (
                  <p className="error">{errors.password}</p>
                ) : null}
              </div>

              <div className="container-login100-form-btn m-t-32">
                {user ? (
                  alert("already logged in !")
                ) : (
                  <button className="login100-form-btn" onClick={login}>
                    Login
                  </button>
                )}
              </div>
              <div>
                <p>
                  Don't have Account ?{" "}
                  <span>
                    <Link to={"/register"}>Register</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
