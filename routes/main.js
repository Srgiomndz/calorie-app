const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const postsController = require('../controllers/posts')
const profileController = require('../controllers/profile')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', homeController.getIndex)
router.get('/profile', ensureAuth, postsController.getProfile)
router.get('/dashboard', ensureAuth, postsController.getDashboard)
router.post('/dashboard/entry', profileController.addNewEntry)
router.post('/dashboard/reset', profileController.resetEntries)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router
