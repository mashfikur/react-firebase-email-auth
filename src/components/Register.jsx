const Register = () => {

  const handleSubmit= (e) => {
    e.preventDefault()
    const email=e.target.email.value
    const password=e.target.password.value
    console.log(email,password)
  }

  return (
    <div>
      <div className="text-center  ">
        <h3 className="text-2xl mb-4">Please Register Now</h3>
        <form 
        onSubmit={handleSubmit}
        className="space-y-6">
          <input
            className="border bg-gray-200 rounded-md w-1/4 py-3 px-3"
            type="email"
            name="email"
            placeholder="Email Address"
            id=""
          />
          <br />
          <input
            className="border bg-gray-200 rounded-md w-1/4 py-3 px-3"
            type="password"
            name="password"
            placeholder="Password"
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
