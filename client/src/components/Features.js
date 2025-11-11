import React from 'react'
import { NavLink } from 'react-router-dom'

export const Features = () => {
  return (
    <section className="section features-section">
      <div className="container features-container flex" >
        <h2>Features</h2>
        <div className='features-items grid'>
            <NavLink className='features-item' to='/createElection'> Create Election </NavLink>
            <NavLink className='features-item' to='/participate'> Participate </NavLink>
            <NavLink className='features-item' to='/ongoing'> Vote</NavLink>
            <NavLink className='features-item' to='/evmCreateElection'> EVM</NavLink>
         
          
        </div>

      </div>
    </section>
  )
}
