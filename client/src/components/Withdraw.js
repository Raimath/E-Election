import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../context/context';

export const Withdraw = () => {
    const { loginInfo, setloginInfo } = useContext(Context);

    const handleWithdraw = async (electionName) => {
        console.log(electionName)

        try {
            const response = await fetch(`http://localhost:8000/withdraw`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ electionName , candidateId: loginInfo._id })
            });
            const data = await response.json();
            console.log(data);
            setloginInfo(data.candidate)
            console.log(loginInfo);

        } catch (error) {
            console.error("Error withdrawing:", error);
        }
    };
    useEffect(() => {
        // console.log(loginInfo.myElections)
    }, [loginInfo]);
    return (
        <div>
            <h2>My Elections</h2>
            <div className="withdraw flex">
                {loginInfo && Array.isArray(loginInfo.myElections) && loginInfo.myElections.length > 0 ? (
                    loginInfo.myElections.map((election, index) => (

                        <div key={index} className="withdraw-item flex">
                            <div>
                                <p>Election: {election.electionName}</p>
                                <p>Election: {election.partyName}</p>
                            </div>
                            <img src={election.partyLogo} alt={`${election.partyName} logo`} />
                            <button type="submit" className="login-btn" name="submit" onClick={()=>handleWithdraw(election.electionName)} >withdraw  </button>

                        </div>

                    ))
                ) : ("No Elections found")}
            </div>
        </div>
    )
}
