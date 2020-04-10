const express = require('express');
const authMiddleWare = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleWare);

router.get('/', (request,response)=>{
    response.send({ok:true, user: request.userId});
});

module.exports = app => app.use('/projects',router);