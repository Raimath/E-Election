import React from 'react'
import { Cards } from './Cards'
import { VoterLogin } from './VoterLogin'
import { VoterRegister } from './VoterRegister'
import { CreateElection } from './CreateElection'
import { OnGoing } from './OnGoing'
import { Participate } from './Participate'
import { CandidatLogin } from './CandidatLogin'

export const Home = () => {
  return (
    <>
    {/* <Cards/> */}
    {/* <VoterLogin/> */}
    
    {/* <Participate/> */}
    <OnGoing/>
    {/* <CreateElection/>
    <VoterRegister/>
    <CandidatLogin/> */}
    </>
  )
}
