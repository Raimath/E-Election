const express = require("express")
const Voter = require("../Models/voterSchema")
const Candidate = require("../Models/candidateSchema")
const Election = require("../Models/electionSchema")
const Contact=require('../Models/ContactSchema')


const router = express.Router()

router.get("/", (req, res) => {
    res.send("Welcome to the E-Election API")
})

router.post('/voterLogin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const preUser = await Voter.findOne({ email: email });
        console.log(preUser);
        if (preUser) {
            if (password === preUser.password) {
                return res.status(200).json({ user: preUser });
            } else {
                return res.status(401).json({ message: "Invalid username or password" });
            }
        } else {
            return res.status(404).json({ message: "User does not exist" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});





router.post('/voterRegister', async (req, res) => {
    const { name, fatherName, role, address, age, phone, email, password } = req.body;
    try {
        const preUser = await Voter.findOne({ email: email })
        if (preUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        else {
            const user = new Voter({
                name, fatherName, role, address, age, phone, email, password
            })
            await user.save()
            res.status(201).json({ message: "User registered successfully", user: user });
        }
    } catch (err) {
        console.log(err)
    }
})



router.post('/candidateRegister', async (req, res) => {
    const { name, fatherName, role, address, age, phone, email, password } = req.body;
    try {
        const preUser = await Candidate.findOne({ email: email })
        if (preUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        else {
            const user = new Candidate({
                name, fatherName, role, address, age, phone, email, password
            })
            await user.save()
            res.status(201).json({ message: "User registered successfully", user: user });
        }
    } catch (err) {
        console.log(err)
    }
})


router.post('/candidateLogin', async (req, res) => {
    const { email, password } = req.body
    try {
        const preUser = await Candidate.findOne({ email: email })
        console.log(preUser)
        if (preUser) {
            if (password === preUser.password) {
                res.send({ user: preUser })
            }
            else {
                res.send({ message: "invalid username or password" })
            }
        }
        else {
            return res.status(204).json({ message: "User does not exist" });
        }
    }
    catch (err) {
        console.log(err)
    }

})

router.post('/createElection', async (req, res) => {
    const { electionName, electionCode, endDate } = req.body;
    try {
        const preElection = await Election.findOne({ electionCode: electionCode })
        if (preElection) {
            return res.status(400).json({ message: "Election with this code already exists" });
        }
        else {
            const election = new Election({ electionName, electionCode, endDate })
            await election.save()
            res.status(201).json({ message: "Election created successfully", election: election });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get('/getAllElections', async (req, res) => {
    try {
        const elections = await Election.find();
        res.status(200).json({ elections });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/getElectionDetails/:electionCode', async (req, res) => {
    const { electionCode } = req.params;
    try {
        const election = await Election.findOne({ electionCode: electionCode });
        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }
        res.status(200).json({ election });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/participate', async (req, res) => {
    const { candidateName, candidateId, electionCode, partyName, partyLogo } = req.body;
    try {
        const election = await Election.findOne({ electionCode: electionCode });
        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }

        if (election.candidates.some(c => c.candidateId.toString() === candidateId.toString())) {
            return res.status(400).json({
                message: "Candidate already registered for this election"
            });
        }

        if (election.candidates.some(c => c.partyName === partyName)) {
            return res.status(400).json({
                message: "Party with this name is already registered for this election"
            });
        }

        //  candidate1 for save n election table
        const candidate = {
            candidateName,
            candidateId,
            totalVotes: 0,
            partyName,
            partyLogo
        };
        election.candidates.push(candidate);


        //  candidate1 for save n candidate table

        const candidate1 = await Candidate.findById(candidateId)

        if (!candidate1) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        candidate1.myElections.push({
            electionName: election.electionName,
            partyName: candidate.partyName,
            partyLogo: candidate.partyLogo
        });
        await election.save();
        await candidate1.save();
        res.status(201).json({ message: "Candidate registered successfully", election });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post('/vote/:electionCode', async (req, res) => {
    const { electionCode } = req.params;
    const { candidateId, voterId } = req.body;
    try {
        const election = await Election.findOne({ electionCode: electionCode });
        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }

        const candidate = election.candidates.find(c => c._id.toString() === candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        candidate.totalVotes += 1;


        const voter = await Voter.findById(voterId);

        if (voter.myVotes.some(v => v.electionCode === Number(electionCode))) {
            return res.status(400).json({ message: "You have already voted in this election" });
        }


        voter.myVotes.push({
            electionCode: election.electionCode,
            electionId: election._id,
            candidateName: candidate.candidateName,
            partyName: candidate.partyName,
            partyLogo: candidate.partyLogo
        });
        console.log(voter);
        await election.save();
        await voter.save();

        res.status(200).json({ message: "Vote cast successfully", data: voter });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/getVoterInfo', async (req, res) => {
    const { userid } = req.body;
    try {
        const user = await Voter.findById(userid);
        if (!user) {
            return res.json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post('/getCandidateInfo', async (req, res) => {
    const { userid } = req.body;
    try {
        const user = await Candidate.findById(userid);
        if (!user) {
            return res.json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/withdraw', async (req, res) => {
    const { electionName, candidateId } = req.body;
    try {
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        const candidateElection = candidate.myElections.find(e => e.electionName === electionName);
        if (!candidateElection) {
            return res.status(404).json({ message: "Election not found in candidate's records" });
        }
        candidate.myElections = candidate.myElections.filter(e => e.electionName !== electionName);

        const election = await Election.findOne({ electionName: electionName });
        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }
        election.candidates = election.candidates.filter(c => c.candidateId.toString() !== candidateId);


        // Remove the candidate from the election's candidates list
        await candidate.save();
        await election.save();
        res.status(200).json({ message: "Withdrawal successful", election, candidate });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/getResults/:electionCode', async (req, res) => {
    const { electionCode } = req.params;
    try {
        const election = await Election.findOne({ electionCode: electionCode });
        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }
        res.status(200).json({ election: election });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/contact',async(req,res)=>{
    const {name,email,message}=req.body;
    try{
        const contact=new Contact({name,email,message}) 
        await contact.save();
        res.status(200).json({message:"Message Submitted successfully"})
        console.log(contact)
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
    }
})
module.exports = router;