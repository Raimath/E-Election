import voting from '../images/voting.png';
import evm from '../images/evm.png';
import participate from '../images/participate.png';
import host from '../images/host.png';
import verification from '../images/verification.png';
import results from '../images/results.png';

export const Services = () => {
  return (
    <>
        <section className='section services-section'>
            <div className='container services-container flex flex-column' >
                <h2>Services</h2>
                <div className='services-items grid' >
                    <div className='services-item flex flex-column'> 
                        <img src={voting} alt='Online Voting'/>
                        <h3>Online Voting</h3>
                        <p>Our platform allows voters to cast their votes securely from any location using a web browser. The system ensures confidentiality, prevents duplicate votes, and provides a seamless experience, making it ideal for colleges, societies, or corporate elections.</p>
                    </div>
                    <div className='services-item flex flex-column'> 
                        <img src={evm} alt='evm'/>
                        <h3>EVM Simulation</h3>
                        <p>We provide a digital simulation of electronic voting machines, allowing voters to experience a realistic voting interface. This feature ensures transparency, reduces errors in vote recording, and helps voters become familiar with the process before the actual election.</p>
                    </div>
                    <div className='services-item flex flex-column'> 
                        <img src={host} alt='host'/>
                        <h3>Host an Election</h3>
                        <p>Administrators can easily create and manage elections with full control over election settings. You can define the election name, code, duration, and candidate list, making it simple to organize elections for multiple levels or departments within your organization.</p>
                    </div>
                    <div className='services-item flex flex-column'> 
                        <img src={participate} alt='participate'/>
                        <h3>Participate in Election</h3>
                        <p>Candidates can register effortlessly through the platform and access all necessary election information. They can view their nomination status, track updates, and receive notifications about upcoming elections, ensuring full participation without any manual intervention.</p>
                    </div>
                    <div className='services-item flex flex-column'>
                        <img src={results} alt='results'/> 
                        <h3>Real-Time Results</h3>
                        <p>The system automatically counts votes as they are cast and displays live results once the election ends. This feature guarantees transparency, eliminates the need for manual counting, and allows organizers and participants to monitor election outcomes instantly.</p>
                    </div>
                    <div className='services-item flex flex-column'> 
                        <img src={verification} alt='verification'/>
                        <h3>Voter Verification</h3>
                        <p>To maintain election integrity, our system verifies voter eligibility before allowing them to cast a vote. The verification process ensures that only registered voters participate, preventing fraud and maintaining trust in the election process.</p>
                    </div>
                   
                </div>
            </div>
        </section>
    </>
  )
}
