// context/ElectionContext.js
import React, { createContext, useState, useEffect } from "react";

export const ElectionContext = createContext();

export const ElectionProvider = ({ children }) => {
  // helper to load from localStorage
  const loadData = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [electionName, setElectionName] = useState(() => loadData("electionName", ""));
  const [candidates, setCandidates] = useState(() => loadData("candidates", []));
  const [votes, setVotes] = useState(() => loadData("votes", {}));
  const [isElectionStarted, setIsElectionStarted] = useState(() => loadData("isElectionStarted", false));

  // save to localStorage whenever things change
  useEffect(() => {
    localStorage.setItem("electionName", JSON.stringify(electionName));
  }, [electionName]);

  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem("isElectionStarted", JSON.stringify(isElectionStarted));
  }, [isElectionStarted]);

  const addCandidate = (candidate) => {
    setCandidates([...candidates, candidate]);
    setVotes({ ...votes, [candidate.name]: 0 });
  };

  const castVote = (name) => {
    setVotes((prev) => ({ ...prev, [name]: prev[name] + 1 }));
  };

  const resetElection = () => {
    setElectionName("");
    setCandidates([]);
    setVotes({});
    setIsElectionStarted(false);
    localStorage.clear(); // 👈 clears everything
  };

  return (
    <ElectionContext.Provider
      value={{
        electionName,
        setElectionName,
        candidates,
        addCandidate,
        votes,
        castVote,
        isElectionStarted,
        setIsElectionStarted,
        resetElection,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};
