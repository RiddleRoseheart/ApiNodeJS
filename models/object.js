const mongoose = require('mongoose');
//objects are BOOKS!!!!
const objectBluePrint = mongoose.Schema(
    {
        title:{
            type: String,
            required : [true, "Enter the title:"]
        },
        author:{
            type: String,
            required: true,
        },
        euros:{
            type: Number,
            required: true,
            default: 0,
        }, 
        image:{
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
)


const Object = mongoose.model('Object', objectBluePrint);

module.exports = Object;