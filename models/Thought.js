const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
        // need getter method for formatting date upon retrieval
    }
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
        // need getter method for formatting date upon retrieval
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
}, 
{
    toJSON: {
        virtuals: true
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length; 
});

// create User model from UserSchema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;