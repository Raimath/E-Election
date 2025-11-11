const mongoose = require('mongoose');

const electionSchema=new mongoose.Schema({
    electionName: String,
    electionCode: Number,
    endDate: Date, 
    candidates: [{
        candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
        candidateName: String,
        totalVotes: Number,
        partyName: String,
        partyLogo: String,
        
    }],
    
});
module.exports = mongoose.model('Election', electionSchema);