const express               = require('express'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      bodyParser            = require('body-parser'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      app                   = express(),
      User                  = require('./models/user')

// Config
mongoose.connect('mongodb://localhost:27017/auth_demoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => {console.log(`DB error: ${err}`)})

app.use(require('express-session')({
  secret: 'the tea nepal is very hot',
  resave: false,
  saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended: true}))

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// =============
//    ROUTES
// =============
app.get('/', (req, res)=>{
  res.render('home')
})

app.get('/secret', isLoggedIn,(req, res)=>{

  res.render('secret')
})

// AUTH ROUTES

// show sign up form
app.get('/register', (req, res)=>{
  res.render('register')
})

// handle user sign up
app.post('/register', (req, res)=>{
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
    if(err){
      console.log(err)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, ()=>{
      res.redirect('/secret')
    })
  })
})

// LOGIN ROUTES
app.get('/login', (req, res)=> {
  res.render('login')
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}),(req, res) => {

})

app.get('/logout', (req, res)=>{
  req.logout()
  res.redirect('/')
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

app.listen(3000,()=>{
  console.log('server started.........')
})