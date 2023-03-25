
const express = require('express');
const Auth = require('../middlewares/Auth');
const LikeController = require('./../Controllers/LikeController');

const router = express.Router();

router.post('/post/:postId',Auth,LikeController.postLike);
router.post('/replay/:replayId',Auth,LikeController.replayLike);
router.post('/comment/:commentId',Auth,LikeController.commentLike);

module.exports = router;
