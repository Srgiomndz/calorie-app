const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require('method-override')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')
const profileRoutes = require('./routes/profile')

//use .env file in config folder
require('dotenv').config({ path: './config/.env' })

//passport config
require('./config/passport')(passport)

//connection to DB
connectDB()

//using ejs for views
app.set('view engine', 'ejs')

//static folder containing css,js and images
app.use('/public', express.static('public'))

//body parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//logging - HTTP request logger
app.use(logger('dev'))

//use forms for PUT / DELETE
app.use(methodOverride('_method'))
app.use(
   methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
         // look in urlencoded POST bodies and delete it
         var method = req.body._method
         delete req.body._method
         return method
      }
   })
)

//setup Sessions - stored in MongoDB
app.use(
   session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
   })
)

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//use flash messages for errors, info, ect...
app.use(flash())

//routes that the server is listening to
app.use('/', mainRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)
app.use('/edit', profileRoutes)

//what port our server is listening to
app.listen(process.env.PORT, () => {
   console.log('Server is running, you better catch it!')
})
