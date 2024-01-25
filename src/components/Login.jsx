import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const { error, setError, handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setisChecked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglepass = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const handleChecked = () => {
    setisChecked((prevState) => !prevState);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError({ bool: true, msg: "Email is required" });
      setTimeout(() => {
        setError({ bool: false, msg: "" });
      }, "3000");
      return;
    }
    if (!password) {
      setError({ bool: true, msg: "Password is required" });
      setTimeout(() => {
        setError({ bool: false, msg: "" });
      }, "3000");
      return;
    }

    handleLogin(email, password, isChecked);
  };
  return (
    <div className="bg-login h-screen flex flex-col justify-center items-center relative ">
      <div className="card shrink-0 w-full gap-2 max-w-md shadow-2xl bg-base-100">
        <h1 className="text-4xl font-bold text-center mt-8">Login</h1>
        <form className="card-body " onSubmit={handleSubmit}>
          <div className="form-control gap-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={email}
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control gap-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              onChange={handleChange}
              name="password"
              value={password}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="password"
              className={"input input-bordered relative"}
              required
            />
            <button
              type="button"
              className="absolute right-10 top-[270px] flex text-gray-600"
              onClick={togglepass}
            >
              {isPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChecked}
              />
              <p>Keep me logged in</p>
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
          <div>
            <p>
              Don&apos;t have an account?
              <button
                className="btn btn-link btn-lg"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
      {error.bool && (
        <div role="alert" className="alert absolute top-20 w-96 alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error.msg}</span>
        </div>
      )}
    </div>
  );
};

export default Login;
