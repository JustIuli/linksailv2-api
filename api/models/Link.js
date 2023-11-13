const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const linkSchema = new Schema({

    linkUrl : {
        type:String,
        required:true
    },
    
    linkVisits : {
        type:Number,
        required:true
    },

    uniqueId : {
        type:String,
        required:true,
        unique:true
    },

    shortenedLink : {
        type:String,
        required:true,
        unique:true
    }

});

module.exports = mongoose.model('Link' , linkSchema);
