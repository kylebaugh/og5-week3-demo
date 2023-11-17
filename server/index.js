// Import packages and files
import express from 'express'
import session from 'express-session'
// // import ViteExpress from 'vite-express' --- THIS  IS FOR FUTURE PROJECTS
import cors from 'cors'
import drinks from './db.json' assert {type: 'json'}
import handlerFunctions from './controller.js'


// Setup my express instance
const app = express()


// Setup Middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.static('client'))
app.use(session({
    secret: 'Thisisasupersecret',
    saveUninitialized: true,
    resave: false
}))


// ROUTES GO HERE

const {sayHello, allDrinks, oneDrink, addDrink, deleteDrink, updateDrink} = handlerFunctions

app.get('/hello', sayHello)

app.get('/drinks', allDrinks)

app.get('/oneDrink/:index', oneDrink)

app.post('/drink', addDrink)

app.delete('/drink/:id', deleteDrink)

app.put('/drink/:id', updateDrink)



// Start up server with app.listen
app.listen(8000, () => console.log('Avengers assemble on http://localhost:8000'))

// ViteExpress.listen(app, 8000, () => {
//     console.log('Avengers assemble at http://localhost:8000')
// })
