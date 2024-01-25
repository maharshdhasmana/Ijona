import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { useContext } from "react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    user,
    handleDelete,
    setUser,
    getData,
    userlist,
    loading,
    addData,
    handleedit,
  } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    getData();
  }, []);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    Name: "",
    Official_Email: "",
    Point_of_Contact: "",
  });

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [modaltitle, setModalTitle] = useState("");
  const addUser = () => {
    addData(newUser);
    setNewUser({ Name: "", Official_Email: "", Point_of_Contact: "" });
    setModalOpen(false);
  };
  const editUser = () => {
    handleedit(selectedUserId, newUser);
    setNewUser({ Name: "", Official_Email: "", Point_of_Contact: "" });
    setModalOpen(false);
  };

  const handlesubmit = (e) => {
    if (e.target.name === "Add User") {
      addUser();
    }
    if (e.target.name === "Edit User") {
      editUser();
    }
  };
  const openModal = (name, userId) => {
    console.log(userId);
    const userToEdit = userlist.find((user) => user.id === userId);
    if (userToEdit) {
      setNewUser({
        Name: userToEdit.Name,
        Official_Email: userToEdit.Official_Email,
        Point_of_Contact: userToEdit.Point_of_Contact,
      });
      setSelectedUserId(userId);
    }
    setModalTitle(name);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setNewUser({ Name: "", Official_Email: "", Point_of_Contact: "" });
  };

  if (user === null && localStorage.getItem("user") === null) {
    return navigate("/Login");
  } else {
    if (loading) {
      return (
        <div className="flex justify-center w-screen h-screen items-center">
          <span className="loading loading-infinity w-20 text-purple-600"></span>
        </div>
      );
    }
    return (
      <>
        <NavBar />
        <div className="p-4 min-w-full flex flex-col gap-4">
          <div className="flex justify-between">
            <h2 className="text-3xl">Users</h2>
            <button
              name="Add User"
              onClick={() => openModal("Add User", null)}
              className="bg-slate-300 hover:bg-green-500 px-3 py-1 rounded-2xl font-bold"
            >
              + Add
            </button>
          </div>
          <div>
            <table className="table text-center ">
              <thead>
                <tr className="bg-green-500">
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Official Email</th>
                  <th className="py-2 px-4 border-b">Point of Contact</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userlist.map((user) => (
                  <tr className="text-center" key={user.id}>
                    <td className="py-2 px-4 border-b">{user.id}</td>
                    <td className="py-2 px-4 border-b">{user.Name}</td>
                    <td className="py-2 px-4 border-b">
                      {user.Official_Email}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.Point_of_Contact}
                    </td>
                    <td className="py-2 px-4 border-b flex justify-around">
                      <button
                        className="text-blue-500 font-bold"
                        name="Edit User"
                        onClick={() => openModal("Edit User", user.id)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className=""
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#ff0000"
                            d="M9 13v6c0 .552-.448 1-1 1s-1-.448-1-1v-6c0-.552.448-1 1-1s1 .448 1 1zm7-1c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1s1-.448 1-1v-6c0-.552-.448-1-1-1zm-4 0c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1s1-.448 1-1v-6c0-.552-.448-1-1-1zm4.333-8.623c-.882-.184-1.373-1.409-1.189-2.291l-5.203-1.086c-.184.883-1.123 1.81-2.004 1.625l-5.528-1.099-.409 1.958 19.591 4.099.409-1.958-5.667-1.248zm4.667 4.623v16h-18v-16h18zm-2 14v-12h-14v12h14z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-8 rounded shadow-md flex flex-col">
                <h2 className="text-xl font-bold mb-4">{modaltitle}</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <label> User Name</label>
                      <input
                        name="Name"
                        className="input input-bordered w-full max-w-xs"
                        value={newUser.Name}
                        onChange={handleChange}
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label> Official Email</label>
                      <input
                        name="Official_Email"
                        className="input input-bordered w-full max-w-xs"
                        value={newUser.Official_Email}
                        onChange={handleChange}
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label>Point of Contact</label>
                    <input
                      className="input input-bordered w-full max-w-s"
                      type="text"
                      name="Point_of_Contact"
                      value={newUser.Point_of_Contact}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex mt-5 justify-end gap-4">
                  <button
                    onClick={closeModal}
                    className="btn btn-circle btn-outline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <button
                    name={modaltitle}
                    onClick={handlesubmit}
                    className="btn btn-primary"
                  >
                    {modaltitle}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
};

export default Dashboard;
