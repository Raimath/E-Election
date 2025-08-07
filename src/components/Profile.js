import { NavLink, Outlet } from 'react-router-dom'
import profile from '../images/Profile.png'
import { useContext } from "react"
import { Context } from "../context/context"

export const Profile = () => {
  const { loginInfo } = useContext(Context)
  const { setisLogedin } = useContext(Context);
  // console.log(loginInfo.role)

  return (
    <div>

      <section className="section myVotes-section">
        <div className="container myVotes-container flex" >

          <div className='profile-content '>
            <div className='profile-nav flex'>
              <img src={profile} alt='profle' />
              <NavLink to="myProfile" className={({ isActive }) => isActive ? "profile-link my-profile-active" : "profile-link"}>My Profile</NavLink>
              {loginInfo.role === "voter" ? (
                <NavLink to="myVotes" className={({ isActive }) => isActive ? "profile-link my-profile-active" : "profile-link"}>My Votes</NavLink>
              ) : (
                <>
                  <NavLink to="myElections" className={({ isActive }) => isActive ? "profile-link my-profile-active" : "profile-link"}>My Elections</NavLink>
                  <NavLink to="withdraw" className={({ isActive }) => isActive ? "profile-link my-profile-active" : "profile-link"}>Withdraw</NavLink>
                </>)}
              <NavLink to="/" onClick={() => {
                setisLogedin(false);
                localStorage.removeItem('id');
              }}>Logout</NavLink>
            </div>
            <Outlet />
          </div>
        </div>
      </section>

    </div>
  )
}
