const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const postsController = require('../controllers/posts')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/home', ensureAuth, postsController.getPostHome) // retrieves all posts from DB
router.get('/:id', ensureAuth, postsController.getPost) // retrieves a single post from the DB
router.post('/createPost', upload.single('file'), postsController.createPost) // creates a post and stores it in the DB. Originally allowed users to upload a image of their choice.
// need to finish this one..  router.put('/likePost/:id', postsController.likePost)
router.delete('/deletePost/:id', postsController.deletePost) // deletes one post from the DB

module.exports = router
