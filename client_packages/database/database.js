const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

const Character
    = mongoose.model('Character', {
        id: Number,
        firstname: String,
        gender: Number,
        health: Number,
        armor: Number,
        money: String,
        fraction: Number,
        lvl: Number,
        lastname: String,
        adminlvl: Number
    });

const User
    = mongoose.model('User', {
        login: String,
        email: String,
        password: String,
        characters: Character,
    });

const Fraction
    = mongoose.model('Fraction', {
        id: Number,
        name: String,
        membersCount: Number,
        membersOnline: Number,
        members: Character
    });

const ReportMessage
    = mongoose.model('ReportMessage', {
        sender: String,
        content: String,
        time: Number
    })

const Report
    = mongoose.model('Report', {
        messages: ReportMessage,
        adminName: String,
        characterName: String,
        isClosed: Boolean
    })

const Vehicle 
    = mongoose.model('Vehicle', {
        engine: Boolean,
        fuel: Number,
        fuelType: Number
    })

const Bonuscode 
    = mongoose.model('Bonuscode', {
        code: String,
        author: String,
        used: Number,
        limit: Number,
        exp: Number,
        vip: Number,
        vipdays: Number,
        items: String
    })