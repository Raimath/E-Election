import { useContext } from "react"
import { Context } from "../context/context"

export const MyProfile = () => {
    const { loginInfo } = useContext(Context)
    return (
        <div className="my-profile-container flex">

            <h2>My Profile</h2>
            {loginInfo && (
                <div className="my-profile flex">   
                    <p><span>Name</span><br/> {loginInfo.name}</p>
                    <p><span>Father Name</span><br/> {loginInfo.fatherName}</p>
                    <p><span>Age</span><br/> {loginInfo.age}</p>
                    <p><span>Role</span><br/> {loginInfo.role}</p>
                    <p><span>Email</span><br/> {loginInfo.email}</p>
                    <p><span>Phone</span><br/> {loginInfo.phone}</p>
                    <p><span>Address</span><br/> {loginInfo.address}</p>
                    

                </div>
            )}

        </div>
    )
}
