import React, { useState } from 'react'
import { useContext } from "react"
import { Context } from "../context/context"

export const Participate = () => {
    const { loginInfo } = useContext(Context)
    const [candidate, setCandidate] = useState({
        candidateName: "",
        candidateId: localStorage.getItem('id')||loginInfo._id,
        electionCode: "",
        partyName: "",
        partyLogo: "",

    })

    const handleChange = e => {
        const { name, value } = e.target
        setCandidate({
            ...candidate,
            [name]: value
        })
    }

    const handleParticipate = async (e) => {

        if (!loginInfo._id || !localStorage.getItem('id')||loginInfo.role !== "candidate") {
            alert("Please log in as candidate to Participate.");
            return;
        }

        const { candidateName, electionCode, candidateId, partyName, partyLogo } = candidate
        e.preventDefault();
        // setformLoading(true)
        if (candidateName && electionCode && partyName && partyLogo) {
            // axios.post("http://localhost:8000/register",user).then((res)=> console.log(res))
            const res = await fetch("http://localhost:8000/participate", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ candidateName, candidateId, electionCode, partyName, partyLogo })
            });
            const data = await res.json()
            // setformLoading(false)
            alert(data.message)
            // navigate('/login')

        }
        else {
            alert("Invalid input")
            // setformLoading(false)
        }
    }
    return (
        <div>


            <section className="section form-section">
                <div className="container form-container flex">
                    <form className=" form-content flex" >
                        {/* {formLoading ? (<FormLoader/>) : ("")} */}
                        <h2>Participate</h2>

                        <div className='form-input flex'>
                            <label htmlFor='candidateName'> Name:</label>
                            <input id='candidateName' name="candidateName" value={candidate.candidateName} type="text" placeholder="First Name" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='electionCode'> Election Code:</label>
                            <input id='electionCode' name="electionCode" value={candidate.electionCode} type="number" placeholder="electionCode" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='partyName'> partyName:</label>
                            <input id='partyName' name="partyName" value={candidate.partyName} type="text" placeholder="partyName" required onChange={handleChange} />
                        </div>

                        <div className='form-input flex'>
                            <label htmlFor='partyLogo'> party Logo:</label>
                            <input id='partyLogo' name="partyLogo" value={candidate.partyLogo} type="text" placeholder="partyLogo" required onChange={handleChange} />
                        </div>

                        \
                        <button type="submit" className="login-btn" name="submit" onClick={handleParticipate} >Register</button>

                    </form>
                </div>
            </section>

        </div>
    )
}
