let stockStorage = JSON.parse(localStorage.getItem("stockStorage")) || [];
let shopCartStorage = JSON.parse(localStorage.getItem("shopCartStorage")) || [];

const addProduct = (id) => {
    let product = stockStorage.find(item => item.idProduct === id);
 
    shopCartStorage.push(product);
    localStorage.setItem("shopCartStorage", JSON.stringify(shopCartStorage));
}

class Product {
    constructor(handmakerName, nameProduct, priceProduct, totalStock){
        this.idProduct = stockStorage.length > 0 ? Math.max(...stockStorage.map(p => p.idProduct)) + 1 : 1;
        this.handmakerName = handmakerName
        this.nameProduct = nameProduct;
        this.priceProduct = priceProduct;
        this.totalStock = totalStock;
        this.totalSales = 0;
    }
}


// funcion buscada en google para que quede mas bonito el proyecto, sinceridad ante todo
function toPascalCase(frase) { 
    return frase.trim().split(' ').map(function(palabra) {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    }).join(' ');
  }

let formulary = document.getElementById("formulary");

formulary.addEventListener("submit", (e) => {
    e.preventDefault();

    let handmakerName = toPascalCase(document.querySelector("#handmakerName").value);
    let nameProduct = document.querySelector("#inputName").value.toUpperCase();
    let priceProduct = document.querySelector("#inputPrice").value;
    let totalStock = document.querySelector("#inputTotalStock").value; 

    if (nameProduct === "" || handmakerName === "" || isNaN(priceProduct) || isNaN(totalStock)){
    alert("Complete todos los campos")
    return;
    }

stockStorage.push(new Product(handmakerName, nameProduct, priceProduct, totalStock));

localStorage.setItem("stockStorage", JSON.stringify(stockStorage));

nameProduct = "";
priceProduct = "";
totalStock = "";
location.reload();
});

let cardSection = document.getElementById("sectioncards");

let allFilter = document.getElementById("allFilter");
let upToDown = document.getElementById("upToDown"); 
let downToUp = document.getElementById("downToUp"); 

const cards = (array) => {
array.forEach(product => {
        let div = document.createElement("div");
        div.className = "mycard";
    
        div.innerHTML = `
        <img src="img/collar artesanal 1.jpg" alt="Collar artesanal">
        <div class="wordCard">
        <h2 class="productNameCard">${product.nameProduct}</h2>
        <p class="handmakerName">${product.handmakerName}</p>
        </div>
        <div class="buttonToRight">
            <b>$${product.priceProduct}</b>
            <button id="addToBuy_${product.idProduct}" class="buttonShopCart">Añadir Al Carrito</button>
        </div>
        `
        cardSection.append(div);
    
        let button = document.getElementById(`addToBuy_${product.idProduct}`);
        button.addEventListener("click", () => addProduct(product.idProduct));    
})};

cards(stockStorage);

allFilter.addEventListener("click", () => {
    cardSection.innerHTML = "";
    cards(stockStorage)
});
upToDown.addEventListener("click", () =>{
    cardSection.innerHTML = "";
    let upToDownStorage = stockStorage.slice().sort((a, b) => (a.priceProduct - b.priceProduct));
    cards(upToDownStorage);
});
downToUp.addEventListener("click", () => {
    cardSection.innerHTML = "";
    let downToUpStorage = stockStorage.slice().sort((a, b) => (b.priceProduct - a.priceProduct));
    cards(downToUpStorage);
});

 let query = document.getElementById("searchInput").value;

 let searchInput = document.getElementById("searchInput");

let searchButton = document.getElementById("searchButton");
let searchForm = document.getElementById("searcher");

searchForm.addEventListener("submit", (e) => {
e.preventDefault();
    let inputs = e.target.children;
    let query = inputs[0].value.trim();
    let arrayIncludes = [];

stockStorage.forEach(product => {
 
let includesOrNot = product.nameProduct.toLowerCase().includes(query.toLowerCase());

const inputValue = query;
const regex = /\s{2,}/g;
const newInputValue = inputValue.replace(regex, ' ');



if(includesOrNot){
    cardSection.innerHTML = "";
    arrayIncludes.push(product);

    

    cards(arrayIncludes);

} else if (query === "" || inputValue !== newInputValue){
      cardSection.innerHTML = "";
      cards(stockStorage);
}})

if(arrayIncludes.length > 0){
    cards(stockStorage);
}});