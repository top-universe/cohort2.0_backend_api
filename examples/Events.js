const EventEmitter = require('events')
const myEmitter = new EventEmitter();

const newSale = (saleObject) => {
    console.table(saleObject)
}

const informAdmin = (email) => {
    return email
}

let saleObject = {
    email: "solomonmarvel@hotmail.com",
    item: "10948294",
    price: 5000
}

//setup listener
myEmitter.on("newSale", newSale)

//returns the value by default
myEmitter.emit("newSale", informAdmin(saleObject.email))

newSale(saleObject)