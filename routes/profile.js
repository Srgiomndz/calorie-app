const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const profileController = require('../controllers/profile')
const { ensureAuth, ensureGuest } = require('../middleware/auth')




// Profile routes - can expand on this to edit profile info like, age, height etc

router.put("/updateProfile", upload.single("file"), profileController.updateProfile);


module.exports = router;
