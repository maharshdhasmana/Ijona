import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth/AuthContext";
const Home = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      navigate("/dashboard");
    } else {
      navigate("/Login");
    }
  });
};
export default Home;
