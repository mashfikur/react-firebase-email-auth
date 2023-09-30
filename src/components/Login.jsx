import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import auth from "../firebase.config";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [showError, setShowError] = useState("");
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    //reseting the error message
    setShowError("");

    if (password.length < 6) {
      setShowError("Your password should be more than 6 charectars");
      return;
    }

    // signing in a user with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        e.target.email.value = "";
        e.target.password.value = "";
        toast.success("Logged In Successfully");
      })
      .catch((error) => {
        setShowError(`${error.message.split(':')[1]}`);
      });
  };

  const handleForgetPass = () => {
    const emailField = emailRef.current.value;

    // reseting the error
    setShowError("");

    // validating the email the user gave us.
    if (emailField.length <= 0) {
      setShowError("Enter Your email");
      return;
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailField)
    ) {
      setShowError("Please Enter a Valid Email");
      return;
    }

    // sending a password reset email 
    sendPasswordResetEmail(auth,emailField)
    .then(() => {
      toast.success("Please Check Your Email")
      emailRef.current.value=""
    })
    .catch((error) => {
      toast.error(`${error.message}`)
    })

  };

  return (
    <div className="hero py-20 ">
      <div className="hero-content gap-20 flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  name="email"
                  ref={emailRef}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <Link
                    onClick={handleForgetPass}
                    href=""
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </Link>
                </label>
                {showError && (
                  <label className="label">
                    <p className="text-red-600 font-medium">{showError}*</p>
                  </label>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
