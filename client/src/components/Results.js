
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export const Results = () => {
    const { electionCode } = useParams({})
    const [electionDetails, setElectionDetails] = useState(null);

    const getResults = async () => {
        try {
            const response = await fetch(`http://localhost:8000/getResults/${electionCode}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            // console.log(data);
            if (data.election) {
                setElectionDetails(data.election);
                // console.log(data.election);
            } else {
                console.error("Results not found");
            }
        } catch (error) {
            console.error("Error fetching results:", error);
        }
    }


    useEffect(() => {
        getResults();
    }, [electionCode]);
    return (
        <>
            <section className="section results-section">
                <div className="container results-container onGoing-container flex" >
                    <h2>Results</h2>
                    <div className="results-card candidates-list flex">
                        {electionDetails ? (
                            <div className="onGoing-card">
                                <h4>{electionDetails.electionName}</h4>
                                <p>End Date: {new Date(electionDetails.endDate).toLocaleDateString()}</p>
                                <p>Election Code: {electionDetails.electionCode}</p>
                                {electionDetails.candidates && electionDetails.candidates.length > 0 ? (
                                    <div className="candidates-list results-list">
                                        <h3>Candidates:</h3>
                                        {electionDetails.candidates.map((candidate) => (
                                            <div key={candidate._id} className="candidate-item results-item flex">
                                                <div>
                                                    <h4>Name: {candidate.candidateName}</h4>
                                                    <p>Party: {candidate.partyName}</p>
                                                </div>
                                                <img src={candidate.partyLogo} alt={candidate.party} className="party-logo" />
                                                <div><b>Votes: {candidate.totalVotes}</b></div >
                                                    

                                            </div>

                                        ))}
                                    </div>) : "No election details available"}
                            </div>
                        ) : (
                            <p>Loading results...</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
