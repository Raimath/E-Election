import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FormLoader } from './Loader';

export const CandidateRegister = () => {
    const [formLoading, setformLoading] = useState(false)
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        fatherName: "",
        age: "",
        phone: "",
        role: "candidate",
        constituency: "",
        email: "",
        password: "",
        confirmPassword: "",

    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleRegister = async (e) => {
        const { name, fatherName, address, role, age, phone, constituency, email, password, confirmPassword } = user
        e.preventDefault();
        setformLoading(true)
        if (name && email && password && (password === confirmPassword)) {
            // axios.post("http://localhost:8000/register",user).then((res)=> console.log(res))
            const res = await fetch("http://localhost:8000/candidateRegister", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, fatherName, role, address, age, phone, constituency, email, password })
            });
            const data = await res.json()
            setformLoading(false)
            alert(data.message)
            navigate('/candidatLogin')

        }
        else {
            alert("Invalid input")
            setformLoading(false)
        }
    }
    return (
        <div>


            <section className="section form-section">
                <div className="container form-container flex">
                    <form className=" form-content flex" onSubmit={handleRegister}>
                        {formLoading ? (<FormLoader/>) : ("")}
                        <h2>Candidate Register</h2>

                        <div className='form-input flex'>
                            <label htmlFor='name'> Name:</label>
                            <input id='name' name="name" value={user.name} type="text" placeholder="First Name" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='fatherName'> Father Name:</label>
                            <input id='fatherName' name="fatherName" value={user.fatherName} type="text" placeholder="fatherName" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='age'> Age:</label>
                            <input id='age' name="age" value={user.age} type="number" placeholder="age" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='address'> Address:</label>
                            <input id='address' name="address" value={user.address} type="text" placeholder="address" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='phone'> Phone:</label>
                            <input id='phone' name="phone" value={user.phone} type="number" placeholder="phone" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='constituency'> Constituency:</label>
                            <input id='constituency' name="constituency" value={user.address} type="text" placeholder="constituency" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='email'> Email:</label>
                            <input id='email' name="email" value={user.email} type="email" placeholder="Email" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='password'> Password:</label>
                            <input id='password' name="password" value={user.password} type="password" placeholder="password" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='confirmPassword'> Confirm Password:</label>
                            <input id='confirmPassword' name="confirmPassword" value={user.confirmPassword} type="password" placeholder="Confirm Password" required onChange={handleChange} />
                        </div>
                        <button type="submit" className="login-btn" name="submit" >Register</button>
                        <div className='regiter-link'>
                            <NavLink to="/candidatLogin">Already Have an Account? Login</NavLink>
                        </div>
                    </form>
                </div>
            </section>

        </div>
    )
}
