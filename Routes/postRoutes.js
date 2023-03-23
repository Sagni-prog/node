const express = require('express');
const PostController = require('./../Controllers/PostController');

const router = express.Router();

router.get('/',PostController.index);
router.post('/',PostController.create);
router.get('/:id',PostController.getPost);
router.patch('/:id',PostController.update);
router.delete('/:id',PostController.destroy);


module.exports = router;