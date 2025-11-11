// const e = require('express');
const mongoose = require('mongoose');

const candidateSchema=new mongoose.Schema({
    name: String,
    fatherName: String,
    age: Number,
    phone:Number,
    address: String,
    myElections:[{
        electionName: String,
        electionCode: Number,
        totalVotes: Number,
        partyName: String,
        partyLogo: String,
    }],
    role: String,
    email: String,
    password: String,
})

module.exports=mongoose.model('Candidate', candidateSchema);