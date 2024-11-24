// Classe pour représenter un produit
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Classe pour représenter un élément du panier d'achat
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    // Méthode pour calculer le prix total de l'élément
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// Classe pour représenter le panier d'achat
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Méthode pour obtenir le total des éléments dans le panier
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Méthode pour obtenir le prix total du panier
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Méthode pour ajouter un élément au panier
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity; // Si l'élément existe, on augmente la quantité
        } else {
            this.items.push(new ShoppingCartItem(product, quantity)); // Sinon, on l'ajoute
        }
    }

    // Méthode pour supprimer un élément du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    // Méthode pour afficher les éléments du panier
    displayItems() {
        this.items.forEach(item => {
            console.log(`${item.product.name} (x${item.quantity}): ${item.getTotalPrice()}€`);
        });
    }
}

// Test des classes et méthodes
const product1 = new Product(1, "Produit A", 10);
const product2 = new Product(2, "Produit B", 20);
const product3 = new Product(3, "Produit C", 30);

const cart = new ShoppingCart();

// Ajout d'éléments au panier
cart.addItem(product1, 2);
cart.addItem(product2, 1);
cart.addItem(product3, 3);

// Affichage des éléments du panier
console.log("Éléments dans le panier :");
cart.displayItems();

// Affichage du total des éléments
console.log(`Total des éléments dans le panier : ${cart.getTotalItems()}`);

// Affichage du prix total du panier
console.log(`Prix total du panier : ${cart.getTotalPrice()}€`);

// Suppression d'un élément du panier
cart.removeItem(2); // Suppression du produit B

// Affichage des éléments du panier après suppression
console.log("Éléments dans le panier après suppression :");
cart.displayItems();