import drinks from './db.json' assert {type: 'json'}

let globalId = 4

const handlerFunctions = {

    sayHello: (req, res) => {
        res.send('Hello there!')
    },

    allDrinks: (req, res) => {
        res.send(drinks)
    },

    oneDrink: (req, res) => {

        console.log('the req.params are', req.params)

        res.send(drinks[req.params.index])
    },

    addDrink: (req, res) => {
        // create an object
        // pass in the values from the request
        // add that object to the drinks array
        console.log(req.body)
        const {drinkName, drinkPic} = req.body

        let newObj = {
            id: globalId,
            name: drinkName,
            picture: drinkPic,
            votes: 0
        }

        drinks.push(newObj)

        globalId++

        res.send(drinks)
    },

    deleteDrink: (req, res) => {
        // get the id to delete from the user
        // find the drink object with the matching id
        // remove object from array

        for(let i = 0; i < drinks.length; i++){
            console.log(drinks[i].id)
            if(drinks[i].id === +req.params.id){
                drinks.splice(i, 1)
                break
            }
        }
        res.send(drinks)
    },

    updateDrink: (req, res) => {
        const index = drinks.findIndex((el) => el.id === +req.params.id)

        const {type} = req.body

        if(type === 'upvote'){
            drinks[index].votes++
        }else if(type === 'downvote'){
            drinks[index].votes--
        }

        res.send(drinks)
    }

}

export default handlerFunctions