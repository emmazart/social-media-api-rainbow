const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

UserSchema.post('findOneAndDelete', document => {
    const userThoughts = document.thoughts;
    // console.log(userThoughts);
    
    return Thought.deleteMany({ _id: { $in: userThoughts } })
        .then(console.log("thoughts deleted"))
        .catch(err => console.log(err));
});

// create User model from UserSchema
const User = model('User', UserSchema);

module.exports = User;