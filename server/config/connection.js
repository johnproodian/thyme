const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/act-group40', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: false,
    // useFindAndModify: false
});

module.exports = mongoose.connection;