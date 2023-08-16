const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.idCounter = 1;
    this.products = [];

    // Leer el archivo y cargar los productos si es que existe
    this.loadProducts();
  }

  // Cargar los productos desde el archivo
  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
      // Encontrar el máximo id para continuar autoincrementándose
      const maxId = this.products.reduce(
        (max, product) => Math.max(max, product.id),
        0
      );
      this.idCounter = maxId + 1;
    } catch (error) {
      // Si el archivo no existe o está vacío, continúa  con idCounter en 1
      this.products = [];
    }
  }

  // Guardar los productos en el archivo
  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }

  addProduct(productData) {
    // Se asigna un id autoincrementable
    const product = {
      id: this.idCounter++,
      ...productData,
    };
    this.products.push(product);
    // Guardar en el archivo
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    return product || null;
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      // Actualizar los campos sin que se borre el id
      this.products[index] = {
        ...this.products[index],
        ...updatedFields,
        id,
      };
      // Guardar en el archivo
      this.saveProducts();
      return true; // Actualización exitosa
    }
    return false; // Producto no encontrado
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      // Guardar en el archivo
      this.saveProducts();
      return true; // Eliminación exitosa
    }
    return false; // Producto no encontrado
  }
}

// Ejemplo de uso
const productManager = new ProductManager("productos.json");

productManager.addProduct({
  title: "Producto 1",
  description: "Descripción producto 1",
  price: 10.99,
  thumbnail: "imagen1.jpg",
  code: "P1",
  stock: 5,
});

console.log(productManager.getProducts());

const productToUpdate = {
  title: "Producto Actualizado",
  description: "Descripción actualizada",
  price: 15.99,
  thumbnail: "imagen2.jpg",
  code: "P1", // No se puede cambiar el código, ya que es el identificador único
  stock: 8,
};
productManager.updateProduct(1, productToUpdate);

console.log(productManager.getProducts());

// productManager.deleteProduct(1);

console.log(productManager.getProducts());

// Export class ProductManager
module.exports = ProductManager;