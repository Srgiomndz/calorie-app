const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/comment')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.post('/createComment/:id', commentsController.createComment)

router.post('/deleteComment/:id', commentsController.deleteComment)

router.put('/likeComment/:id', commentsController.likeComment)

module.exports = router
