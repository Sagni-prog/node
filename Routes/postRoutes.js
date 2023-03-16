const express = require('express');
const PostController = require('./../Controllers/PostController');

const router = express.Router();

router.get('/',PostController.index);
router.post('/',PostController.create);
router.get('/:id',PostController.getPostById);

module.exports = router;