let events
let currentDate  
let params //con url search params se guarda el valor del ID de cada card
let id 
let card  //lee el valor del id segun el array que esta en index.js y lo compara con el array para imprimir la tarjeta

fetch('https://amazing-events.herokuapp.com/api/events')
    .then(response => response.json())
    .then (response => {
        currentDate = response.currentDate
        events = response.events
        const queryString = location.search //
        params = new URLSearchParams(queryString) //con url search params se guarda el valor del ID de cada card
        id = params.get("id")
        card = events.find(item => item._id == id)
        const div = document.getElementById("cont-cards")   //imprime la card con toda la informacion
        div.innerHTML = `<div class="card card-details">
        <img src="${card.image}" class="card-img-details card-img-top p-3 justify-content-center" alt="Picture of ${card.name}">
        <h5 class="card-title-details text-align-center">${card.name}</h5>
        <div class="card-body-details">
        <ul>
        <li>Date:${card.date}</li>
        <li>Description:${card.description}</li>
        <li>Category:${card.category}</li>
        <li>Place:${card.place}</li>
        <li>Capacity:${card.capacity}</li>
        <li>Assistance:${card.assistance || card.estimate}</li> 
        </ul>
        <p class="price-details fw-bold text-center text-decoration-underline">Price:$${card.price}</p>
        </div>
        </div>`
        })


//la comparacion es porque los upcoming tienen estimate y los past assistance, si no comparo lo muestra undefined

