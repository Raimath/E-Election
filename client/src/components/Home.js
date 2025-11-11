import React from 'react'
import { Cards } from './Cards'
import { VoterLogin } from './VoterLogin'
import { VoterRegister } from './VoterRegister'
import { CreateElection } from './CreateElection'
import { OnGoing } from './OnGoing'
import { Participate } from './Participate'
import { CandidatLogin } from './CandidatLogin'
import { Services } from './Services'
import { Features } from './Features'
import { Slider } from './Slider'
import { Contact } from './Contact'

export const Home = () => {
  return (
    <>
    {/* <Cards/> */}
    {/* <VoterLogin/> */}
    
    {/* <Participate/> */}

    <Slider/>
    <Features/>
    <OnGoing/>
    <Services/>
    <Contact/>
    {/* <CreateElection/>
    <VoterRegister/>
    <CandidatLogin/> */}
    </>
  )
}
