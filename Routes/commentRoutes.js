const express = require('express');
const CommentController = require('./../Controllers/CommentController');
const Auth = require('./../middlewares/Auth');
const Policy = require('./../middlewares/Policy');

const router = express.Router();

router.get('/',Auth,CommentController.index);
router.post('/',Auth,CommentController.create);
router.patch('/:id',Auth,Policy.commentPolicy,CommentController.update);
router.delete('/:id',Auth,Policy.commentPolicy,CommentController.delete);

module.exports = router;