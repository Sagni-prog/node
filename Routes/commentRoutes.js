const express = require('express');
const CommentController = require('./../Controllers/CommentController');

const router = express.Router();

router.get('/',CommentController.index);
router.post('/',CommentController.create);
router.patch('/:id',CommentController.update);
router.delete('/:id',CommentController.delete);

module.exports = router;