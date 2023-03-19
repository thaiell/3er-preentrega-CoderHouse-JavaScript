let stockStorage = JSON.parse(localStorage.getItem("stockStorage")) || [];
let shopCartStorage = JSON.parse(localStorage.getItem("shopCartStorage")) || [];

const addProduct = (id) => {
    console.log(stockStorage);
    console.log(id);
    let product = stockStorage.find(item => item.idProduct === id);
    
    console.log(product);
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

let formulary = document.getElementById("formulary");

formulary.addEventListener("submit", (e) => {
    e.preventDefault();

    let handmakerName= document.querySelector("#handmakerName").value.toCamelCase();
    console.log(handmakerName);
    let nameProduct = document.querySelector("#inputName").value.toUpperCase();
    console.log(nameProduct);
    let priceProduct = document.querySelector("#inputPrice").value;
    console.log(priceProduct); 
    let totalStock = document.querySelector("#inputTotalStock").value; 
    console.log(totalStock);

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
    console.log(stockStorage);
});
upToDown.addEventListener("click", () =>{
    cardSection.innerHTML = "";
    let upToDownStorage = stockStorage.slice().sort((a, b) => (a.priceProduct - b.priceProduct));
    cards(upToDownStorage);
    console.log(upToDownStorage);
});
downToUp.addEventListener("click", () => {
    cardSection.innerHTML = "";
    let downToUpStorage = stockStorage.slice().sort((a, b) => (b.priceProduct - a.priceProduct));
    cards(downToUpStorage);
    console.log(downToUpStorage);
});

let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");

let query = searchInput.value;

const searchProducts = (query) => {

    stockStorage.filter(function(product) {
        return product.nameProduct.toLowerCase().includes(query.toLowerCase());
    });
}


searchButton.addEventListener("click", () => {
    // cardSection.innerHTML = "";

let array = searchProducts(query);

cards(array)
// cards(array);
});

