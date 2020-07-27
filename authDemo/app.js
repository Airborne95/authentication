const express  = require('express'),
      mongoose = require('mongoose'),
      app = express()

mongoose.connect('mongodb://localhost:27017/auth_demoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => {console.log(`DB error: ${err}`)})
app.set('view engine', 'ejs')


app.get('/', (req, res)=>{
  res.render('home')
})

app.get('/secret', (req, res)=>{
  res.render('secret')
})

app.listen(3000,()=>{
  console.log('server started.........')
})