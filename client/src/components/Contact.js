import { useState } from "react"
import { FormLoader } from './Loader';

export const Contact = () => {

  const [formLoading, setformLoading] = useState(false)

  const [user, setUser] = useState({
    name: "",
    message: "",
    email: "",

  })

  const handleChange = e => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    const { name, email, message } = user
    e.preventDefault();
    setformLoading(true)
    if (name && email && message) {
      // axios.post("http://localhost:8000/register",user).then((res)=> console.log(res))
      // const res = await fetch("http://localhost:8000/candidateRegister", {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({ name, fatherName, role, address, age, phone, constituency, email, password })
      // });
      // const data = await res.json()
      // // setformLoading(false)
      // alert("Message sent successfully");
      // navigate('/login')

      // setUser({
      //   name: "",
      //   message: "",
      //   email: "",  
      // })
      try {
        const res = await fetch("http://localhost:8000/contact", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, message })
        })
        const data = await res.json()
        alert(data.message)
        console.log(data.message)
        setformLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    else {
      // alert("Invalid input")
      setformLoading(false)
    }
  }
  return (
    <div>


      <section className="section contact-section form-section">
        <div className="container form-container flex">
          <form className=" form-content flex" onSubmit={handleSubmit}>
            {formLoading ? (<FormLoader />) : ("")}
            <h2>Contact</h2>

            <div className='form-input flex'>
              <label htmlFor='name'> Name:</label>
              <input id='name' name="name" value={user.name} type="text" placeholder="First Name" required onChange={handleChange} />
            </div>

            <div className='form-input flex'>
              <label htmlFor='email'> Email:</label>
              <input id='email' name="email" value={user.email} type="email" placeholder="Email" required onChange={handleChange} />
            </div>

            <div className='form-input flex'>
              <label htmlFor='message'> Message:</label>
              <textarea id='message' name="message" value={user.message} type="text" placeholder="Message" rows="4" required onChange={handleChange} />
            </div>

            <button type="submit" className="login-btn" name="submit"  >Submit</button>

          </form>
        </div>
      </section>

    </div>
  )
}
