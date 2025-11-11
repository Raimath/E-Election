import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Context } from '../context/context'
import { FormLoader } from './Loader';
import { useNavigate } from 'react-router-dom';


export const VoterLogin = () => {
    const { setloginInfo, setisLogedin } = useContext(Context);
    const [formLoading, setformLoading] = useState(false)
    
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",

    })
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleLogin = async (e) => {
        const { email, password } = user
        e.preventDefault();
        setformLoading(true)
        if (email && password) {
            try {
                const res = await fetch("http://localhost:8000/voterLogin", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json()

                if (res.status !== 200) {
                    setformLoading(false)
                    alert(data.message)
                }
                if (res.status === 200) {
                    
                    console.log (data.user)
                    setloginInfo(data.user)
                    console.log("Login Info:", data.user);
                    alert("Login succesful")

                    localStorage.setItem('id', data.user._id)
                    setisLogedin(true)
                    setformLoading(false)
                    navigate('/home')
                }
            } catch (error) {
                setformLoading(false)
                alert("Invalid Username front  or Password")
            }
        }
        else {
            setformLoading(false)
            alert("Invalid input")
        }
    }

    // useEffect(() => {
    //     console.log("Updated loginInfo:", loginInfo);
    // }, [loginInfo]);


    return (
        

            <section className="section form-section">
                <div className="container form-container flex" >
                    <form className="form-content flex" onSubmit={handleLogin}>
                         {formLoading ? (<FormLoader/>) : ("")}
                    <h2>Voter Login</h2>

                        <div className="form-input flex">
                            <label htmlFor='email'>Email:</label>
                            <input id='email' name="email" value={user.email} type="email" placeholder="Email" required onChange={handleChange} />

                        </div>
                        <div className="form-input flex">
                            <label htmlFor='password'>Password:</label>
                            <input id='password' name="password" type="password" value={user.password} placeholder="password" required onChange={handleChange} />
                        </div>

                        <button type="submit" className="login-btn" name="submit" >Login</button>
                        <div className='regiter-link'>
                            <NavLink to="/VoterRegister">New User? Register</NavLink>
                        </div>
                    </form>

                </div>
            </section>
        
    )
}