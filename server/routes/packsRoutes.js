const express = require('express');
const packsController = require('../controllers/packsController');

const router = express.Router();

router.route('/')
  .post(packsController.createPack)
  .put(packsController.updatePack);

router.route('/joined')
  .get(packsController.getJoinedPacks);

router.route('/others')
  .get(packsController.getOtherPacks);

router.route('/:id')
  .delete(packsController.deletePack);

router.route('/pack')
  .get(packsController.getPack);

router.route('/posts')
  .get(packsController.getPosts)
  .post(packsController.createPost)
  .put(packsController.updatePost);

router.route('/posts/:id')
  .delete(packsController.deletePost);

router.route('/users')
  .get(packsController.getPackUsers);

module.exports = router;
