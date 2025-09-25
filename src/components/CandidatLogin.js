import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Context } from '../context/context'
import { FormLoader } from './Loader';

export const CandidatLogin = () => {
    const [formLoading, setformLoading] = useState(false)
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",

    })
    const { setloginInfo, setisLogedin } = useContext(Context);
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
            // axios.post("http://localhost:8000/register",user).then((res)=> console.log(res))
            try {
                const res = await fetch("http://localhost:8000/candidateLogin", {
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
                    setloginInfo(data.user)
                    localStorage.setItem('id', data.user._id)
                    setisLogedin(true)
                    setformLoading(false)
                    alert("Login succesful")
                    navigate('/home')
                }
            } catch (error) {
                setformLoading(false)
                alert("Invalid Username or Password")
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
                <form className="form-content flex" >
                    {formLoading ? (<FormLoader />) : ("")}
                    <h2>Candidate Login</h2>

                    <div className="form-input flex">
                        <label htmlFor='email'>Email:</label>
                        <input id='email' name="email" value={user.email} type="email" placeholder="Email" required onChange={handleChange} />

                    </div>
                    <div className="form-input flex">
                        <label htmlFor='password'>Password:</label>
                        <input id='password' name="password" type="password" value={user.password} placeholder="password" required onChange={handleChange} />
                    </div>

                    <button type="submit" className="login-btn" name="submit" onClick={handleLogin} >Login</button>
                    <div className='regiter-link'>
                        <NavLink to="/candidateRegister">New User? Register</NavLink>
                    </div>
                </form>

            </div>
        </section>

    )
}
