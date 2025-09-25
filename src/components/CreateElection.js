import { useState } from "react"
import { FormLoader } from './Loader';

export const CreateElection = () => {
   const [election, setElection] = useState({
        electionName: "",
        electionCode: "",
        endDate: "",
       
    })
    const [formLoading, setformLoading] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target
        setElection({
            ...election,
            [name]: value
        })
    }

    const handleCreateElection = async (e) => {
        const { electionName, electionCode, endDate } = election
        e.preventDefault();
        setformLoading(true)
        if (electionName && electionCode && endDate) {
            // axios.post("http://localhost:8000/register",user).then((res)=> console.log(res))
            const res = await fetch("http://localhost:8000/createElection", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ electionName, electionCode, endDate })
            });
            const data = await res.json()
            setformLoading(false)
            alert(data.message)
            // navigate('/login')

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
                    <form className=" form-content flex" >
                        {formLoading ? (<FormLoader/>) : ("")}
                        <h2>Create Election</h2>

                        <div className='form-input flex'>
                            <label htmlFor='electionName'> Name:</label>
                            <input id='electionName' name="electionName" value={election.electionName} type="text" placeholder="Election Name" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='electionCode'> Election Code:</label>
                            <input id='electionCode' name="electionCode" value={election.electionCode} type="number" placeholder="Election Code" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='endDate'> End Date:</label>
                            <input id='endDate' name="endDate" value={election.endDate} type="date" placeholder="End Date" required min={new Date().toISOString().split("T")[0]} onChange={handleChange} />
                        </div>

                        <button type="submit" className="login-btn" name="submit" onClick={handleCreateElection} >Create Election</button>
                       
                    </form>
                </div>
            </section>

        </div>
    )
}
