const router = require('express').Router();
const { Thought, User } = require('../../models');

// GET    /api/thoughts
// get all thoughts
router.get('/', (req, res) => {
    Thought.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// GET   /api/thoughts/:id
// get one thought by id
router.get('/:id', ({ params }, res) => {
    Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// POST    /api/thoughts
// create a thought
router.post('/', ({ body }, res) => {
    Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id }},
                { new: true }
            )
        })
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

module.exports = router;