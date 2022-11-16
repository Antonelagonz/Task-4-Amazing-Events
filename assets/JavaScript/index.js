let events
let currentDate
const $checkboxs = document.getElementById('checkboxs')
const $contCards = document.getElementById('cont-cards')
let fn = (card) => card.category 
let cardCategories
let categories 
let noRepeatCategories 
let arrayNoRepeatCategories 
const searchBarFunction = document.getElementById('search')


fetch('https://amazing-events.herokuapp.com/api/events')
    .then(response => response.json())
    .then (response => {
        events = response.events
        currentDate = response.currentDate
        cardCategories = events.filter(fn)
        categories = cardCategories.map(fn)
        noRepeatCategories = new Set(categories)
        arrayNoRepeatCategories = Array.from(noRepeatCategories)
        console.log(arrayNoRepeatCategories)
        createCheckboxs(arrayNoRepeatCategories, $checkboxs)
        printCards(events, $contCards)
        $checkboxs.addEventListener('change', (event) =>{  //escucha si hay cambios en los checkboxs
        printCards(filteredText(filterCards(events)), $contCards)  //si hay cambio activa las funciones para hacer las cartas dinamicas
        })
        //searchbar function read input
        searchBarFunction.addEventListener("keyup", (e)=>{  
        e.preventDefault()
        printCards(filteredText(filterCards(events)), $contCards) //1ro filtra checkboxs, 2do searchbar y si esta bien imprime cards
        })
        searchBarFunction.addEventListener("submit", (e)=>{
        e.preventDefault()
})

    })
    .catch(error => console.log(error))

function createCheckboxs(values, container){  //crea las checkboxs por cada categoria
    let template=''
    values.forEach(value => template += `
    <label class="btn btn-light active">
    <input class="form-check-input me-2" type="checkbox" value="${value}" id="flexCheckDefault2" checked autocomplete="off">${value}
    </label>
    `)
    container.innerHTML = template
}
createCheckboxs(arrayNoRepeatCategories, $checkboxs)

function createCard( card ) { //crea las cartas

    let div = document.createElement('div')
    div.className = 'card border-primary'
    div.textContent = events.name
    div.classList.add(`card`);
    div.innerHTML = `<img src="${card.image}" class="card-img-top" alt="Image of ${card.name}" />
    <div class="card-body d-flex flex-column align-items-center">
    <h3 class="card-title">${card.name}</h3>
    <p class="card-text"> ${card.description}</p>
    <h5 class="mt-auto">Price:$${card.price} </h5>
    <a href="./details.html?id=${card._id}" class="btn btn-primary align-self-stetch" role="button">More info...</a>
    </div>`
    return div
}

//imprime las cartas
function printCards(events, container){  
    container.innerHTML=''

    let fragment = document.createDocumentFragment()
    if(events.length!=0){                   //si hay una categoria seleccionada imprime las cartas
        events.forEach(event => fragment.appendChild(createCard(event)))
        container.appendChild(fragment)
    }else{
        $contCards.innerHTML= `<h2>There is no results for your search.</h2>`   //de lo contrario muestra un mensaje
    }
}
printCards(cardCategories, $contCards)



//filter events function 
function filterCards(events){
    let checked= Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input=>input.value) //toma el valor de los checkboxes
    if(fn.length!=0){
        return events.filter(card => checked.includes(card.category)) //filtra segun los checkboxes marcados
    } else {
        return events //si no hay nada devuelve todas las cards
    }
}

//function text filter
function filteredText(array){
    let input_value = document.querySelector("input[type='search']").value //toma el valor de la searchbar
    if (input_value==""){
        return array //si no hay valor devuelve array entero
    } else{
        return array.filter(card=>card.name.toLowerCase().includes(input_value.toLowerCase())) //filtra segun el input del searchbar
    }
}

