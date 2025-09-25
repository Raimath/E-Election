// pages/CreateElection.js
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ElectionContext } from "../context/ElectionProvider";

export default function EVMCreateElection() {
    const { setElectionName, addCandidate, candidates, setIsElectionStarted, isElectionStarted } =
        useContext(ElectionContext);

    const [ename, setEname] = useState("");
    const [candidate, setCandidate] = useState({ name: "", party: "", logo: "" });
    const navigate = useNavigate();

    // 🔹 Check if election already exists, redirect to /vote
    useEffect(() => {
        if (isElectionStarted) {
            navigate("/evmVotingPage");
        }
    }, [isElectionStarted, navigate]);

    const handleAddCandidate = () => {
        if (candidate.name && candidate.party) {
            addCandidate(candidate);
            setCandidate({ name: "", party: "", logo: "" });
        }
    };

    const handleStart = () => {
        setElectionName(ename);
        setIsElectionStarted(true);
        navigate("/vote");
    };

    return (
        <div>
            <section className="section evm-form-section form-section">
                <div className="container evm-form-container form-container flex">
                    <h2>Create Election</h2>
                    <input
                        type="text"
                        placeholder="Election Name"
                        value={ename}
                        onChange={(e) => setEname(e.target.value)}
                    />

                    <h3>Add Candidate</h3>
                    <input
                        type="text"
                        placeholder="Candidate Name"
                        value={candidate.name}
                        onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Party Name"
                        value={candidate.party}
                        onChange={(e) => setCandidate({ ...candidate, party: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Logo URL"
                        value={candidate.logo}
                        onChange={(e) => setCandidate({ ...candidate, logo: e.target.value })}
                    />
                    <button className="evm-btns" onClick={handleAddCandidate}>Add Candidate</button>

                    {/* 🔹 Show added candidates dynamically */}
                    {candidates.length > 0 && (
                        <div>
                            <h3>Added Candidates</h3>
                            <ul className="evm-candidate flex">
                                {candidates.map((c, i) => (
                                    <li key={i} className="flex">
                                        <img src={c.logo} alt="logo" width="40" height="40"  />
                                        <strong>{c.name}</strong> ({c.party})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <br />
                    <button className="evm-btns" onClick={handleStart}>Create and Start Election</button>
                </div>
            </section>
        </div>
    );
}
