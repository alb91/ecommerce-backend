class ProductManager {
  constructor() {
    this.products = [];
    this.idCounter = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.error(`Ya existe un producto con el código ${code}`);
      return;
    }

    const item = {
      id: this.idCounter++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(item);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return "Not found";
    }
  }
}

// Ejemplos
const productManager = new ProductManager();

productManager.addProduct(
  "Producto 1",
  "Descripción producto 1",
  10.99,
  "imagen1.jpg",
  "P1",
  5
);
productManager.addProduct(
  "Producto 2",
  "Descripción producto 2",
  19.99,
  "imagen2.jpg",
  "P2",
  3
);

console.log(productManager.getProducts());

console.log(productManager.getProductById(2));
console.log(productManager.getProductById(4));
