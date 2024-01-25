import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
const NavBar = () => {
  const { handleLogout, user } = useContext(AuthContext);
  return (
    <div className="flex justify-between items-center p-4  rounded-full mt-5 shadow-md bg-slate-300 ">
      <div>
        <img
          className="w-[150px] h-[50px] hidden lg:flex"
          src="https://cdn-laglb.nitrocdn.com/gWBOejBjLCVoScNubNkTINgIgnHuFRyY/assets/images/optimized/rev-d6181f7/ijonaservices.com/wp-content/uploads/2023/01/White-version.svg"
        />
        <img
          className="flex lg:hidden w-[50px] h-[50px] ml-4"
          src="https://cdn-laglb.nitrocdn.com/gWBOejBjLCVoScNubNkTINgIgnHuFRyY/assets/images/optimized/rev-d6181f7/ijonaservices.com/wp-content/uploads/2023/01/cropped-Icon-only.png"
        />
      </div>
      <div className="flex gap-4">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-12">
            <span className="text-3xl">
              {user.Email.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <h2 className="text-xl hidden items-center lg:flex">{user.Email}</h2>
        <button className="btn hover:btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
