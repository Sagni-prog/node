const express = require('express');
const PostController = require('./../Controllers/PostController');
const Auth = require('./../middlewares/Auth');
const Policy = require('./../middlewares/Policy');

const router = express.Router();

router.get('/',Auth,PostController.index);
router.post('/',PostController.postPhoto,Auth,PostController.create);
router.get('/:id',PostController.getPost);
router.patch('/:id',Auth,Policy.postPolicy,PostController.update);
router.delete('/:id',Auth,Policy.postPolicy,PostController.destroy);

module.exports = router;