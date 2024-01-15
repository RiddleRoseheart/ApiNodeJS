const mongoose = require('mongoose');



const authorBlueprint = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter the name:"]
        },
        bio: {
            type: String,
            required: false,
        },
        books: [ //can have many booooks
            {
                name: {
                    type: String,
                    required: true,
                }
            }
        ]

    },
    {
        timestamps: true,
    }
)

const Author = mongoose.model('Author', authorBlueprint);
module.exports = Author;