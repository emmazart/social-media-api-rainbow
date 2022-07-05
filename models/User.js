const { Schema, model } = require('mongoose');
const { Thought } = require('./index');

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


UserSchema.pre('findOneAndDelete', function(res, next) {
    const err = new Error('Something went wrong')

    const getUser = new Promise((resolve, reject) => {
        const user = this.model.findOne(this.getFilter());
        return currentUser = user.username;
    })

    getUser
        .then(user => {
            if (!user) {
                console.log(err);
                return;
            } else {
                Thought.deleteMany({ username: user }).exec();
                console.log('executing');    
            }
        })
        .then(next())
        .catch(err => {
            console.log(err);
        });
})

// create User model from UserSchema
const User = model('User', UserSchema);

module.exports = User;