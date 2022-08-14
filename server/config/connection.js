const mongoose = require('mongoose');

mongoose.connect(process.env.MOGODB_URI || 'mongodb://localhost/act-group40', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports = mongoose.connection;