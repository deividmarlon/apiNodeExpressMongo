const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/user');

const authConfig = require('../config/auth');

function generateToken(params = {}){
    return token = jwt.sign(params, authConfig.secret,{expiresIn: 86400});
}

router.post('/register', async (request,response) => {
    try{
        const { email } = request.body;
        if(await User.findOne({email})){
            return response.status(400).send({error: 'User already exists'});
        };

        const user = await User.create(request.body);

        user.password = undefined;

        return response.send({
            user,
            token: generateToken({id:user.id}),
        });

    }catch (err){
        return response.status(400).send({error: 'Registration failed'});
    }
});

router.post('/authenticate', async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return response.status(400).send({error: 'User not found'});
    }

    if(! await bcrypt.compare(password,user.password)){
        return response.status(400).send({error: 'Invalid password'});
    }

    user.password = undefined;

    response.send({
        user,
        token: generateToken({id:user.id}),
    });

});

module.exports = app => app.use('/auth',router);