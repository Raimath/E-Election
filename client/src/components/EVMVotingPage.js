// pages/VotingPage.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ElectionContext } from "../context/ElectionProvider";

export default function VotingPage() {
  const { electionName, candidates, castVote } = useContext(ElectionContext);
  const [disabled, setDisabled] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const navigate = useNavigate();

  const handleVote = (name) => {
    if (!disabled) {
      castVote(name);
      setDisabled(true);
      setVotedCandidate(name);

      setTimeout(() => {
        setDisabled(false);
        setVotedCandidate(null); // reset button text and color
      }, 5000);
    }
  };

  return (
    <div>
      <section className="section evm-vote-section vote-section onGoing-section">
        <div className="container evm-voting onGoing-container flex">
          <h2>{electionName} Voting</h2>
          <div className="evm-candidates-list candidates-list flex">
            {candidates.map((c, i) => (
              <div key={i} className="evm-candidate-item candidate-item flex">
                <div>
                  <p>Name: {c.name}</p>
                  <p>Party: {c.party}</p>
                </div>
                <img src={c.logo} alt="logo" className="party-logo" />
                <button
                  className={`vote-button ${votedCandidate === c.name ? "voted" : ""}`}
                  onClick={() => handleVote(c.name)}
                  disabled={disabled}
                >
                  {votedCandidate === c.name ? "Voted" : "Vote"}
                </button>
              </div>
            ))}
          </div>
          <br />
          <button
            className="login-btn"
            onClick={() => navigate("/evmResultPage")}
          >
            End and Result
          </button>
        </div>
      </section>
    </div>
  );
}
