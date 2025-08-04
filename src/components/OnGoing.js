import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/context'
import { Link } from 'react-router-dom'

export const OnGoing = () => {
    const allElections = useContext(Context)
    // console.log(allElections);
    return (
        <>
            <section className="section onGoing-section">
                <div className="container onGoing-container flex" >
                    <h2>OnGoing</h2>
                    <div className="onGoing-card">
                        {allElections.allElections ? allElections.allElections.map((election) => (
                            <Link  to={`/vote/${election.electionCode}`} className="onGoing-card-item" key={election._id}>
                                <h4>{election.electionName}</h4>
                                {/* <p>Start Date: {new Date(election.startDate).toLocaleDateString()}</p>
                                <p>End Date: {new Date(election.endDate).toLocaleDateString()}</p> */}
                            </Link>
                        )) : <p>No ongoing elections</p>}


                    </div>
                </div>
            </section>
        </>
    )
}
