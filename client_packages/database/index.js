const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

const Character
    = mongoose.model('Character', {
        id: Number,
        firstname: String,
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
