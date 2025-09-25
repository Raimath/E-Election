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
import { Results } from './components/Results';
import EVMCreateElection from './components/EVMCreateElection';
import EVMVotingPage from './components/EVMVotingPage';
import EVMResultPage from './components/EVMResultPage';  
import { ElectionProvider } from './context/ElectionProvider';
import { Footer } from './components/Footer';
import { Contact } from './components/Contact';


function App() {
  return (
    <div className="App">

      <ContextProvider>
         <ElectionProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/createElection" element={<CreateElection />} />
          <Route path="/voterLogin" element={<VoterLogin />} />
          <Route path="/voterRegister" element={<VoterRegister />} />
          <Route path='/ongoing' element={<OnGoing />} />
          <Route path="/candidateRegister" element={<CandidateRegister />} />
          <Route path="/candidatLogin" element={<CandidatLogin />} />
          <Route path="/participate" element={<Participate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/evmCreateElection" element={<EVMCreateElection />} />
          <Route path="/evmResultPage" element={<EVMResultPage />} />
          <Route path="/evmVotingPage" element={<EVMVotingPage />} />
          <Route path="/results/:electionCode" element={<Results />} />
          <Route path="/profile" element={<Profile />} >
            <Route path="myProfile" element={<MyProfile />} />
            <Route path="myVotes" element={<MyVotes />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="myElections" element={<MyElections />} />
          </Route>
          <Route path="/vote/:election" element={<Vote />} />

        </Routes>
        <Footer/>
        </ElectionProvider>
      </ContextProvider>

    </div>
  );
}

export default App;
