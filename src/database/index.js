const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://deividmarlon:teste123@cluster0-arqtp.mongodb.net/noderest?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.Promise = global.Promise;

module.exports = mongoose;