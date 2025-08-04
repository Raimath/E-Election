import { useContext } from "react"
import { Context } from "../context/context"

export const MyVotes = () => {
    const { loginInfo } = useContext(Context)
    console.log(loginInfo)
    return (
        <div>
            <h2>My Votes</h2>
            <div className="my-votes flex">
                {loginInfo && Array.isArray(loginInfo.myVotes) && loginInfo.myVotes.length > 0 ? (
                    loginInfo.myVotes.map((vote, index) => (

                        <div key={index} className="vote-item flex">
                            <p>Candidate: {vote.candidateName}</p>
                            <p>Party: {vote.partyName}</p>
                            <img src={vote.partyLogo} alt={`${vote.partyName} logo`} />
                        </div>

                    ))
                ) : ("No votes found")}
            </div>
        </div>
    )
}
