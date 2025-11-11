// const e = require('express');
const mongoose = require('mongoose');
const electionSchema = require('./electionSchema');

const voterSchema = new mongoose.Schema({
    name: String,
    fatherName: String,
    age: Number,
    phone: Number,
    address: String,
    myVotes: [
        {
            electionCode: Number,
            electionId: String,
            candidateName: String,
            partyName: String,
            partyLogo: String,
        }],
    role: String,
    email: String,
    password: String,
    confirmpassword: String,
})

module.exports = mongoose.model('Voter', voterSchema);