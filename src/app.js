const express = require('express')
const app = express()
const routes = require('./routes')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const passport = require('passport')
const { initializePassport } = require('./config')

// handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use('/static', express.static('public'))
initializePassport()
app.use(passport.initialize())

// routes
app.use('/', routes)

// not found
app.use((req, res, next) =>{
	res.status(404).render('not-found', {})
})

// errors
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || err
    console.error(err)
    res.status(status).send(message)
})

module.exports = app
