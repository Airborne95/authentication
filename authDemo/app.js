const express               = require('express'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      bodyParser            = require('body-parser'),
      localStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      app                   = express(),
      User                  = require('./models/user')

// Config
mongoose.connect('mongodb://localhost:27017/auth_demoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => {console.log(`DB error: ${err}`)})

app.use(require('express-session')({
  secre: 'the tea nepal is very hot',
  resave: false,
  saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//ROUTES
app.get('/', (req, res)=>{
  res.render('home')
})

app.get('/secret', (req, res)=>{
  res.render('secret')
})

app.listen(3000,()=>{
  console.log('server started.........')
})