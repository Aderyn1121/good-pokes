const express = require('express');
const check = require('express-validator');
const { requireAuth, getUserToken } = require('../auth')
const { User, Review } = require('../db/models');

const {
    asyncHandler,
    handleValidationErrors,
    arrayFlattener
} = require('../utils');

const router = express.Router();

router.get(
    '/:id(\\d+)/',
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const user = await User.findByPk(userId);
        res.json({
            username: user.userName,
            userId: user.id,
            collection: user.collection,
            birthday: user.birthday,
            pronouns: user.pronouns,
            friends: user.friends,
            groups: user.groups,
        });
    })
);

//get review by userId
router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const posterId = parseInt(req.params.id, 10);
    const reviews = await Review.findAll({
        where: {
            posterId,
        },

        include: [
            {
                model: User
            }
        ]
    })

    const reviewList = reviews.map((review) => {
        return {
            content: review.content,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt
        }
    })

    res.json({ reviewList });
}))

//remove from collection
router.delete('/:id/collection/:name', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    const { collection } = user;

    const pokemonName = req.params.name;

    const newColl = []
    console.log(collection);

    collection.forEach(pokemon => {
        if (pokemon !== pokemonName) newColl.push(pokemon);
    })

    console.log(newColl);
    // const newColl = collection.map(pokemon => {
    //     if (pokemon !== pokemonName) return pokemon;
    // })

    await user.update({ collection: newColl })
    res.json(newColl);
}))


//add to collection
router.post('/:id/collection', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    const { pokemon } = req.body;
    const collection = user.collection

    if (collection.includes(pokemon)) {
        res.json('You already have this pokemon!')
        return;
    }

    collection.push(pokemon);


    await user.update({ collection })
    res.json(collection);
}))

//Get Pokemon Collection
router.get('/:id/collection', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    res.json(user.collection);
}))

module.exports = router;
