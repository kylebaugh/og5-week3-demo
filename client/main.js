console.log('JS is connected!')

const baseUrl = 'http://localhost:8000'

const drinkDisplay = document.querySelector('#drinkDisplay')
const drinkForm = document.querySelector('form')

const createDrinkCard = (drinkObject) => {

    const newDrinkCard = document.createElement('section')
    newDrinkCard.className = 'drink-card'

    newDrinkCard.innerHTML = `
        <img src=${drinkObject.picture} alt='drink picture'/>
        <p>${drinkObject.name}</p>

        <section>
            <button onclick="updateDrink(${drinkObject.id}, 'downvote')">-</button>
            Popularity: ${drinkObject.votes}
            <button onclick="updateDrink(${drinkObject.id}, 'upvote')">+</button>
        </section>

        <br/>
        <button onclick="deleteDrink(${drinkObject.id})" >Delete Me</button>
        <br/>


    `
    drinkDisplay.appendChild(newDrinkCard)
}

const displayAllDrinks = (arr) => {
    for(let i = 0; i < arr.length; i++){
        console.log(arr[i])
        createDrinkCard(arr[i])
    }
}

const getAllDrinks = () => {
    axios.get('http://localhost:8000/drinks')
        .then((response) => {
            console.log(response.data)
            displayAllDrinks(response.data)
        })
        .catch((theseHands) => {
            console.log(theseHands)
        })
}

const handleSubmit = (e) => {
    e.preventDefault()

    drinkDisplay.innerHTML = ''

    let name = document.querySelector('#drinkName')
    let drinkPicture = document.querySelector('#drinkPicture')

    let bodyObj = {
        drinkName: name.value,
        drinkPic: drinkPicture.value
    }

    axios.post(`${baseUrl}/drink`, bodyObj)
        .then((response) => {
            console.log(response.data)
            displayAllDrinks(response.data)
        })
        .catch((theseHands) => {
            console.log(theseHands)
        })
}

const deleteDrink = (id) => {

    axios.delete(`${baseUrl}/drink/${id}`)
        .then((res) => {
            console.log(res.data)
            drinkDisplay.innerHTML = ''
            displayAllDrinks(res.data)
        })
        .catch((theseHands) => {
            console.log(theseHands)
        })
}


const updateDrink = (id, type) => {

    let bodyObj = {
        type: type
    }

    axios.put(`${baseUrl}/drink/${id}`, bodyObj)
        .then((res) => {
            console.log(res.data)
            drinkDisplay.innerHTML = ''
            displayAllDrinks(res.data)
        })
        .catch((theseHands) => {
            console.log(theseHands)
        })
}



drinkForm.addEventListener('submit', handleSubmit)

getAllDrinks()