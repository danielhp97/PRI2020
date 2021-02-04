var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    tipo: String,
    recursos: [{
        //mongoose.ObjectId
        type: mongoose.Schema.Types.ObjectId, ref: 'recursos'// here you set the author ID
                                                            // from the Author colection, 
                                              // so you can reference it
    }],
})

module.exports = mongoose.model('users', userSchema)