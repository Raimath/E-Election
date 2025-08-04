import { useContext } from "react"
import { Context } from "../context/context"

export const MyElections = () => {
    const { loginInfo } = useContext(Context)
    console.log(loginInfo)
    return (
        <div>
            <h2>My Votes</h2>
            <div className="my-votes flex">
                {loginInfo && Array.isArray(loginInfo.myElections) && loginInfo.myElections.length > 0 ? (
                    loginInfo.myElections.map((election, index) => (
                        
                            <div key={index} className="vote-item flex">
                                <p>Election: {election.electionName}</p>
                                <p>Election: {election.partyName}</p>
                                <img src={election.partyLogo} alt={`${election.partyName} logo`} />
                            </div>
                        
                    ))
                ) : ("No votes found")}
            </div>
        </div>

    )
}
