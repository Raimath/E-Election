// pages/ResultPage.js
import React, { useContext } from "react";
import { ElectionContext } from "../context/ElectionProvider";
import { useNavigate } from "react-router-dom";

export default function EVMResultPage() {
  const { electionName, votes, resetElection } = useContext(ElectionContext);
  const navigate = useNavigate();

  const winner = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];

  return (
    <div>
      <section className="section evm-vote-section vote-section onGoing-section">
        <div className="container evm-voting onGoing-container flex" >
          <h2>Results  {electionName}</h2>
          {Object.entries(votes).map(([name, count], i) => (
            <p key={i}>
              {name}: {count} votes
            </p>
          ))}
          {winner && <h3>Winner: {winner[0]} 🎉</h3>}
          <button className="login-btn"
            onClick={() => {
              resetElection();
              navigate("/");
            }}
          >
            Clear Election & Start New
          </button>
        </div>
      </section>
    </div>
  );
}
