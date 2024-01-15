const mongoose = require('mongoose');
//objects are BOOKS!!!!
const objectBluePrint = mongoose.Schema(
    {
        title:{
            type: String,
            required : [true, "Enter the title:"],
            match: [/^[a-zA-Z]*$/, 'A title must contain only letters'],
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Author',
            required:  [true, "Enter the author:"],
        },
        euros:{
            type: Number,
            required: [true, "Enter the euros:"],
            
            validate: {
                    validator: Number.isInteger,
                    message: 'Euros must be an numbers!!',
                        },
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