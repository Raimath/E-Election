import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { VoterLogin } from './components/VoterLogin';
import { VoterRegister } from './components/VoterRegister';
import { CandidateRegister } from './components/CandidateRegister';
import { CandidatLogin } from './components/CandidatLogin';
import { CreateElection } from './components/CreateElection';
import { ContextProvider } from './context/context';
import { Vote } from './components/Vote';
import { Profile } from './components/Profile';
import { MyProfile } from './components/MyProfile';
import { MyVotes } from './components/MyVotes';
import { MyElections } from './components/MyElections';
import { Participate } from './components/Participate';
import { OnGoing } from './components/OnGoing';
import { Withdraw } from './components/Withdraw';

function App() {
  return (
    <div className="App">

      <ContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/createElection" element={<CreateElection />} />
          <Route path="/voterLogin" element={<VoterLogin />} />
          <Route path="/voterRegister" element={<VoterRegister />} />
          <Route path="/candidateRegister" element={<CandidateRegister />} />
          <Route path="/candidatLogin" element={<CandidatLogin />} />
          <Route path="/participate" element={<Participate />} />
          <Route path="/elections" element={<OnGoing />} />
          <Route path="/profile" element={<Profile />} >
            <Route path="myProfile" element={<MyProfile />} />
            <Route path="myVotes" element={<MyVotes />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="myElections" element={<MyElections />} />
          </Route>
          <Route path="/vote/:election" element={<Vote />} />

        </Routes>
      </ContextProvider>

    </div>
  );
}

export default App;
