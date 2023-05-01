const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to save
app.use(express.static(publicDirectoryPath))


// render (a,b) => a is what page to render, b is what to pass (usually object)
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'RAN'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'RAN'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'You need help?',
        title: 'Help',
        nane: 'Ran'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        product: []
    })
})

app.get('/help/*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ran',
        errorMessage: 'Help article not found!'})
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ran',
        errorMessage: 'Page not found!'})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})