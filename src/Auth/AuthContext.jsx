import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
const AuthContextComp = ({ children }) => {
  const [error, setError] = useState({ bool: false, msg: "" });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userlist, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reglo, setReglo] = useState(false);
  const [isdisabled, setisDisabled] = useState(false);
  const handleDelete = async (id) => {
    try {
      axios.delete(
        `https://65b16702d16d31d11bded6fe.mockapi.io/api/ijona/Users/${id}`
      );
      setUserList((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://65b16702d16d31d11bded6fe.mockapi.io/api/ijona/Users",
        {}
      );
      setUserList(response.data);
      console.log(response);
    } catch (e) {
      console.log(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const getDataS = async () => {
    try {
      const response = await axios.get(
        "https://65b16702d16d31d11bded6fe.mockapi.io/api/ijona/Users",
        {}
      );
      setUserList(response.data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
  const addData = async (newUser) => {
    try {
      await axios.post(
        "https://65b16702d16d31d11bded6fe.mockapi.io/api/ijona/Users",
        {
          Name: newUser.Name,
          Official_Email: newUser.Official_Email,
          Point_of_Contact: newUser.Point_of_Contact,
        }
      );
      setUserList([...userlist, { ...newUser }]);
    } catch (e) {
      console.log(e.response.data.message);
    } finally {
      getDataS();
    }
  };
  const handleLogout = () => {
    setUser({});
    localStorage.removeItem("user");
    navigate("/login");
  };
  const handleedit = async (selectedUserId, newUser) => {
    console.log(selectedUserId);
    try {
      await axios.put(
        `https://65b16702d16d31d11bded6fe.mockapi.io/api/ijona/Users/${selectedUserId}`,
        {
          Name: newUser.Name,
          Official_Email: newUser.Official_Email,
          Point_of_Contact: newUser.Point_of_Contact,
        }
      );
      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUserId ? { ...user, ...newUser } : user
        )
      );
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
  const handleRegister = async (email, password) => {
    try {
      setReglo(true);
      await axios.post(
        "https://65b16702d16d31d11bded6fe.mockapi.io/api/ijona/Login",
        {
          Email: email,
          Password: password,
        }
      );
      setisDisabled(false);
      setReglo(false);
      navigate("/login");
    } catch (e) {
      setisDisabled(false);
      setError({ bool: true, msg: e.response.data.message });
    }
  };
  const handleLogin = async (email, password, isChecked) => {
    try {
      setReglo(true);
      const response = await axios.get(
        "https://65b16702d16d31d11bded6fe.mockapi.io/api/ijona/Login",
        {}
      );
      setReglo(false);
      const user = response.data.find((u) => u.Email === email);
      if (!user) {
        setError({ bool: true, msg: "User Not Found" });
        setisDisabled(false);
        setTimeout(() => {
          setError({ bool: false, msg: "" });
        }, "3000");
        return;
      }
      if (user.Password !== password) {
        setError({ bool: true, msg: "Invalid credentials" });
        setisDisabled(false);
        setTimeout(() => {
          setError({ bool: false, msg: "" });
        }, "3000");
        return;
      }
      setUser(user);
      if (isChecked) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      setisDisabled(false);
      navigate("/dashboard");
    } catch (e) {
      setError({ bool: true, msg: e.response.data.message });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        error,
        setError,
        user,
        setUser,
        handleLogout,
        handleLogin,
        setUserList,
        userlist,
        loading,
        getData,
        addData,
        handleDelete,
        handleedit,
        handleRegister,
        reglo,
        isdisabled,
        setisDisabled,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextComp;
