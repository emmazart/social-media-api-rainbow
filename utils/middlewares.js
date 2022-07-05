const UserSchema = require('../models/User');
const { Thought } = require('../models');

// middleware for below route
const cascadeDeleteThoughts = function() {
    UserSchema.pre('findOneAndDelete', async function(res, next) {
        const user = await this.model.findOne(this.getFilter());
        await Thought.deleteMany({ username: user.username });
        next();
    });
}

module.exports = cascadeDeleteThoughts;

