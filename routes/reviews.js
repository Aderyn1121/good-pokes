const express = require('express');
const { check } = require('express-validator')
const { Review, User } = require('../db/models');
const { requireAuth } = require('../auth');
const {
    asyncHandler,
    handleValidationErrors,
} = require('../utils');

const router = express.Router();

router.use(requireAuth);

const reviewValidators = check('content')
    .exists({ checkFalsy: true })
    .withMessage('You cannot submit empty reviews.');

//delete review
router.delete('/:id/delete', asyncHandler(async (req, res) => {
    const reviewId = parseInt(req.params.id, 10);
    const review = await Review.findByPk(reviewId);
    review.destroy();
    res.status(204).end();
}));

//edit review
router.put('/:id/edit',
    reviewValidators,
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        const reviewId = parseInt(req.params.id, 10);
        const review = await Review.findByPk(reviewId);
        const { content } = req.body;
        await review.update({ content });
        res.json({ message: 'Your review has been updated!' });
    }))

//Get reviews by Pokedex ID
router.get('/:id', asyncHandler(async (req, res) => {
    const pokeId = parseInt(req.params.id, 10);
    const reviews = await Review.findAll({
        where: {
            pokeId,
        },

        include: [
            {
                model: User
            }
        ]
    })

    const comments = reviews.map((review) => {
        return {
            id: review.id,
            userName: review.User.userName,
            content: review.content,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt
        }
    })


    res.json({ comments });
}))



//create review
router.post('/:id/:pokeId', reviewValidators, handleValidationErrors,
    asyncHandler(async (req, res) => {
        console.log(req.body)
        const posterId = parseInt(req.params.id, 10);
        const pokeId = parseInt(req.params.pokeId, 10);
        const { content } = req.body;
        // console.log(content)

        const review = await Review.create({ posterId, pokeId, content })

        // console.log(review);
        res.json('Comment posted!')
    }))

module.exports = router;
