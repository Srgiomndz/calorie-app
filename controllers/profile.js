const cloudinary = require('../middleware/cloudinary');
const DailyEntry = require('../models/DailyEntry');
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/User');
const User = require('../models/User');

// Updates the User model with fields entered in form on profile view page
module.exports = {
  updateProfile: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

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
      );

      console.log(user);

      console.log('Profile pic changed');
      res.redirect('/profile');
    } catch (error) {
      console.log(error);
    }
  },

  addNewEntry: async (req, res) => {
    try {
      await DailyEntry.create({
        intake: req.body.intake,
        weight: req.body.weight,
        user: req.user.id,
      });

      console.log('New entry added to the database');
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  },
};
