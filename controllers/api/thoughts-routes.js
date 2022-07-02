const router = require('express').Router();
const { Thought } = require('../../models');

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

// POST    /api/thoughts
// create a thought
router.post('/', ({ body }, res) => {
    Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

module.exports = router;