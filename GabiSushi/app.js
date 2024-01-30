const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const numProduct = document.querySelector(".numProduct");

openShopping.addEventListener("click", () => {
    body.classList.add("active")
})
closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

let products = [
    {
        id:1,
        name:"sushi 1",
        images: "Uramaki Tempura.jpg",
        price: 100
    },
    {
        id:2,
        name:"sushi 2",
        images: "2.PNG",
        price: 120
    },
    {
        id:3,
        name:"sushi 3",
        images: "3.PNG",
        price: 140
    },
    {
        id:4,
        name:"sushi 4",
        images: "4.PNG",
        price: 1010
    },
    {
        id:5,
        name:"sushi 5",
        images: "5.PNG",
        price: 123
    },
    {
        id:6,
        name:"sushi 6",
        images: "6.PNG",
        price: 99
    },
]

let listCards = [];
const initApp = () => {
    products.forEach((value,key) =>{
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML =`
            <img src ="images/${value.images}">
            <div class ="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>
        `;
        list.appendChild(newDiv)
    })
}

initApp()

const addToCard = key => {
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].numProduct = 1;
        refreshCard();
    } else {
        listCards[key].numProduct++;
        refreshCard(); 
    }
    
}
const refreshCard = () => {
    listCard.innerHTML="";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value != null) {
            let itemTotalPrice = value.price * value.numProduct; // Calculate total price for this item
            totalPrice += itemTotalPrice; // Add to the total price
            count += value.numProduct; // Add to the total count

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src ="images/${value.images}"></div>
                <div class ="cardName">${value.name}</div>
                <div class ="cardPrice">${itemTotalPrice.toLocaleString()}</div>

                <div>
                    <button style="background-color: orange" class="cardButton" onclick="changeNumProduct(${key}, ${value.numProduct - 1})">-</button>
                    <div class ="count">${value.numProduct}</div>
                    <button style="background-color: orange" class="cardButton" onclick="changeNumProduct(${key}, ${value.numProduct + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }

        total.innerText = totalPrice.toLocaleString();
        numProduct.innerText = count;
    })
    
}