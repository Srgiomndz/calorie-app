const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const DailyEntry = require('../models/DailyEntry')
module.exports = {
   getPostHome: async (req, res) => {
      try {
         const posts = await Post.find().populate('user').sort({ createdAt: 'desc' }).lean()

         res.render('postsHome.ejs', { posts: posts })
      } catch (error) {
         console.log(error)
      }
   },

   getProfile: async (req, res) => {
      try {
         const posts = await Post.find({ user: req.user.id })

         res.render('profile.ejs', { posts: posts, user: req.user })
      } catch (err) {
         console.log(err)
      }
   },
   getDashboard: async (req, res) => {
      try {
         let intake = []
         let weight = []
         let time = []
         const data = await DailyEntry.find({ user: req.user.id })
            .select('intake weight createdAt -_id')
            .lean()

         data.map((entryObj) => {
            intake.push(entryObj.intake)
            weight.push(entryObj.weight)
         })

         res.render('dashboard.ejs', { user: req.user, intake: intake, weight: weight })
      } catch (err) {
         console.log(err)
      }
   },
   getPost: async (req, res) => {
      try {
         const post = await Post.findById(req.params.id)
         const comment = await Comment.find({ postid: req.params.id })
         res.render('post.ejs', { post: post, user: req.user, comment: comment })
      } catch (err) {
         console.log(err)
      }
   },
   createPost: async (req, res) => {
      try {

         // if (typeOfPost === 'idea') {
         //    let daImage = //lightbulb
         // } else {
         //    let daImage = // question mark
         // }

         // await Post.create({
         //    title: req.body.title,
         //    image: result.secure_url,
         //    message: req.body.message,
         //    likes: 0,
         //    user: req.user.id,
         // })
         console.log('Post created!')
         res.redirect('/post/home')
      } catch (err) {
         console.log(err)
      }
   },
   likePost: async (req, res) => {
      try {
         await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
               $inc: { likes: 1 },
            }
         )
         console.log('Likes +1')
         res.redirect(`/post/${req.params.id}`)
      } catch (err) {
         console.log(err)
      }
   },
   deletePost: async (req, res) => {
      try {
         // Find post by id
         let post = await Post.findById({ _id: req.params.id })
         // Delete image from cloudinary
         await cloudinary.uploader.destroy(post.cloudinaryId)
         // Delete post from db
         await Post.remove({ _id: req.params.id })
         console.log('Deleted Post')
         res.redirect('/profile')
      } catch (err) {
         res.redirect('/profile')
      }
   },
}
