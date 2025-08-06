import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../context/context';

export const Vote = () => {
    const { election } = useParams({})
    const electionCode = election;
    const [varified, setVarified] = useState(false);
    const [electionDetails, setElectionDetails] = useState(null);
    const { loginInfo } = useContext(Context);

    const [user, setUser] = useState({
        code: ""

    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleVerification = () => {
        if(user.code===electionCode){
            setVarified(true);
            alert("Voter verified successfully");
        }   
    }
    const fetchElectionDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8000/getElectionDetails/${electionCode}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            // console.log(data);
            if (data.election) {
                setElectionDetails(data.election);
            } else {
                console.error("Election not found");
            }
        } catch (error) {
            console.error("Error fetching election details:", error);
        }
    };

    const handleVote = async (candidateId) => {
        if (!loginInfo._id || !localStorage.getItem('id')) {
            alert("Please log in to vote.");
            return;
        }
        try {
            const voterId = loginInfo._id;

            const response = await fetch(`http://localhost:8000/vote/${electionCode}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ candidateId, voterId })
            });
            const data = await response.json();
            alert(data.message);
            console.log(voterId);

        } catch (error) {

            alert("Error casting vote. Please try again.");
        }
    }
    useEffect(() => {
        fetchElectionDetails();
    }, [electionCode]);

    return (
        <div>
            <section className="section onGoing-section">
                <div className="container onGoing-container flex" >
                    <div className="container onGoing-container flex" >
                        {!varified? <div className='voter-verification'>
                            <form className="form-content flex" >
                                <h2>Voter Verification</h2>

                                <div className="form-input flex">
                                    <input id='code' name="code" value={user.email} type="code" placeholder="code" required onChange={handleChange} />

                                </div>

                                <button type="submit" className="login-btn" name="submit" onClick={handleVerification} >Verify  </button>
                                
                            </form>
                        </div>:("")}
                       


                        <h2>Vote</h2>
                        {electionDetails ? (
                            <div className="onGoing-card">
                                <h4>{electionDetails.electionName}</h4>
                                <p>End Date: {new Date(electionDetails.endDate).toLocaleDateString()}</p>
                                <p>Election Code: {electionDetails.electionCode}</p>
                                {electionDetails.candidates && electionDetails.candidates.length > 0 ? (
                                    <div className="candidates-list">
                                        <h3>Candidates:</h3>
                                        {electionDetails.candidates.map((candidate) => (
                                            <div key={candidate._id} className="candidate-item flex">
                                                <div>
                                                    <h4>Name: {candidate.candidateName}</h4>
                                                    <p>Party: {candidate.partyName}</p>
                                                </div>
                                                <img src={candidate.partyLogo} alt={candidate.party} className="party-logo" />
                                                {/* <NavLink to={`/vote/${electionCode}/candidate/${candidate._id}`} className="vote-button">Vote</NavLink> */}
                                                <button className="vote-button" onClick={() => handleVote(candidate._id)}>Vote</button>
                                            </div>
                                            
                                        ))}
                                    </div>) : "No election details available"}
                            </div>
                        ) : ""}
                    </div>
                </div>
            </section>
        </div>
    )
}
