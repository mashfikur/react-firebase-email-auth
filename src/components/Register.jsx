import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase.config";
import toast from "react-hot-toast";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (password.length < 6) {
      toast.error("Password should be more than 6 charectars");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("User Created Successfully");
        e.target.email.value = "";
        e.target.password.value = "";
      })
      .catch((error) => {
        console.error(error);
        toast.error(`${error.message}`);
      });
  };

  return (
    <div>
      <div className="text-center  ">
        <h3 className="text-2xl mb-4">Please Register Now</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <br />
          <input
            className=" rounded-md btn btn-neutral "
            type="submit"
            value="Register"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
