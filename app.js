const express = require("express");
const ProductManager = require('./main.js');

const app = express();
const PORT = 8080;

// Instancia
const productManager = new ProductManager();


app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// Obtener productos agregando la ruta

app.get("/products", (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
})
// Obtener los productos agregando el limite

// app.get("/products", (req, res) => {
//     const limit = req.query.limit;
//     const products = productManager.getProducts();

//     if (limit) {
//         const limitNUmber = parseInt(limit);
//         //Limite para los resultados
//         products = products.slice(0, limitNUmber);
//     }

//     res.json(products);
// })




//Verificacion 
app.listen(PORT, () => {
    console.log(` El servidor esta escuchando en el puerto ${PORT}`);
});