import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [terms, setTerms] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;

    // password validation and regex usecase

    if (password.length < 6) {
      toast.error("Password should be more than 6 charectars");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Your password should have one uppercase");
      return;
    }

    // creating user with firebase.

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        e.target.email.value = "";
        e.target.password.value = "";
        e.target.name.value = "";
        setTerms(true);

        // updating users profile
        updateProfile(result.user, {
          displayName: `${name}`,
        }).then(() => {

        })
        .catch((error) => {
          toast.error(error.message)
        })
        // sending a verfication link
        sendEmailVerification(result.user).then(() =>
          toast.success("Please check your email to veify your account")
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error(`${error.message}`);
      });
  };

  const handleShow = () => {
    setShowPass(!showPass);
  };

  return (
    <div>
      <div className=" text-center">
        <h3 className="text-2xl mb-4">Please Register Now</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            className="border bg-gray-200 rounded-md w-1/4 py-3 px-3"
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
          <br />
          <input
            className="border bg-gray-200 rounded-md w-1/4 py-3 px-3"
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <br />
          <input
            className="border bg-gray-200 rounded-md w-1/4 py-3 px-3"
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
          />
          <span
            onClick={handleShow}
            className="absolute -ml-8 pt-3 scale-125  cursor-pointer"
          >
            {showPass ? (
              <AiFillEyeInvisible></AiFillEyeInvisible>
            ) : (
              <AiFillEye></AiFillEye>
            )}
          </span>
          <br />
          <div className="space-x-3">
            <input
              onChange={() => setTerms(!terms)}
              type="checkbox"
              name="checkbox"
              id="terms"
            />
            <label htmlFor="terms">I accept Terms and Conditions</label>
          </div>
          <br />
          <input
            className=" rounded-md btn btn-neutral "
            type="submit"
            value="Register"
            disabled={terms}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
