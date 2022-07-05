const router = require('express').Router();
const { User, Thought } = require('../../models');

// GET    /api/users
// get all users
router.get('/', (req, res) => {
    User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
})

// GET    /api/users/:id
// get user by id with populated data
router.get('/:id', ({ params }, res) => {
    User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
});

// POST    /api/users
// create a user
router.post('/', ({ body }, res) => {
    User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
}); 

// POST    /api/users/:userId/friends/:friendId
// add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', ({ params, body }, res) => {
    User.findByIdAndUpdate(
        params.userId,
        { $push: { friends: params.friendId }},
        { new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
}); 

// PUT    /api/users/:id
// update user
router.put('/:id', ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// // middleware for below route
// const cascadeDeleteThoughts = function() {
//     UserSchema.pre('findOneAndDelete', async function(res, next) {
//         const user = await this.model.findOne(this.getFilter());
//         await Thought.deleteMany({ username: user.username });
//         next();
//     });
// }

// const cascadeDeleteThoughts = require('../../utils/middlewares');

// DELETE    /api/users/:id
// delete a user (bonus: delete associated thoughts)
router.delete('/:id', ({ params }, res) => {
    User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }

            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
});

// DELETE    /api/users/:userId/friends/:friendId
// delete a friend from a user's friend list
router.delete('/:userId/friends/:friendId', ({ params }, res) => {
    User.findByIdAndUpdate(
        params.userId,
        { $pull: { friends: params.friendId }},
        { new: true }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id "});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
}); 


module.exports = router;