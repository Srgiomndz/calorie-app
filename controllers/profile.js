const cloudinary = require('../middleware/cloudinary')
const DailyEntry = require('../models/DailyEntry')
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/User')
const User = require('../models/User')

module.exports = {
   // Updates name,bio,age,location and profile picture information of user
   updateProfile: async (req, res) => {
      try {
         const result = await cloudinary.uploader.upload(req.file.path)

         const user = await User.findOneAndUpdate(
            { _id: req.user.id },
            {
               name: req.body.name,
               age: req.body.age,
               location: req.body.location,
               bio: req.body.bio,
               imageUrl: result.url,
               cloudinaryId: result.asset_id,
            }
         )
         console.log(user)
         console.log('Profile pic changed')
         res.redirect('/profile')
      } catch (error) {
         console.log(error)
      }
   },
   // Creates a new entry in the DB
   addNewEntry: async (req, res) => {
      try {
         await DailyEntry.create({
            intake: req.body.intake,
            weight: req.body.weight,
            date: req.body.date,
            user: req.user.id,
         })

         console.log('New entry added to the database')
         res.redirect('/dashboard')
      } catch (error) {
         console.log(error)
      }
   },
   // Deletes all entries in the DB that are associated with a users id
   resetEntries: async (req, res) => {
      try {
         let entries = await DailyEntry.deleteMany({ user: req.user.id })
         console.log(entries.deletedCount + ' entries have been deleted from the DB')
         res.redirect('/dashboard')
      } catch (error) {
         console.log(error)
      }
   },
}
