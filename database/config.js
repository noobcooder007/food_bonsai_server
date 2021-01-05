const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online');
        console.log(process.env.DB_CNN);
    } catch (error) {
        console.log(error);
        throw new Error('Error in database - consult admin');
    }
}

module.exports = {
    dbConnection
}