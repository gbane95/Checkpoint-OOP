// Classe pour le produit
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = parseFloat(price);
    }
}

// Classe pour un élément du panier
class ShoppingCartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    // Méthode pour calculer le prix total d'un élément
    calculateTotal() {
        return this.product.price * this.quantity;
    }
}

// Classe pour le panier
class ShoppingCart {
    constructor() {
        this.items = [];
        this.totalElement = document.querySelector("#total-prix");
    }

    // Ajouter un élément au panier
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.updateTotal();
    }

    // Supprimer un élément du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateTotal();
    }

    // Mettre à jour la quantité d'un élément
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity = quantity > 0 ? quantity : 0;
        }
        this.updateTotal();
    }

    // Calculer le total du panier
    calculateTotal() {
        return this.items.reduce((total, item) => total + item.calculateTotal(), 0);
    }

    // Mettre à jour l'affichage du total
    updateTotal() {
        this.totalElement.textContent = this.calculateTotal().toFixed(3);
    }
}

// Initialisation
const cart = new ShoppingCart();

// Liaison des événements avec l'interface utilisateur
document.querySelectorAll(".card").forEach((card, index) => {
    const name = card.querySelector(".item-name").textContent.trim();
    const price = card.querySelector(".item-prix").textContent.trim();
    const quantiteElement = card.querySelector(".item-quantite");
    const product = new Product(index, name, price);

    // Ajouter l'article initialement au panier
    cart.addItem(product, parseInt(quantiteElement.textContent));

    // Bouton Plus
    card.querySelector(".plus").addEventListener("click", () => {
        let quantite = parseInt(quantiteElement.textContent);
        quantite++;
        quantiteElement.textContent = quantite;
        cart.updateQuantity(product.id, quantite);
    });

    // Bouton Moins
    card.querySelector(".moins").addEventListener("click", () => {
        let quantite = parseInt(quantiteElement.textContent);
        if (quantite > 1) {
            quantite--;
            quantiteElement.textContent = quantite;
            cart.updateQuantity(product.id, quantite);
        }
    });

    // Bouton Supprimer
    card.querySelector(".supprime").addEventListener("click", () => {
        card.remove(); // Retirer l'élément de l'interface
        cart.removeItem(product.id); // Mettre à jour le panier
    });

    // Bouton Like
    card.querySelector(".like").addEventListener("click", () => {
        card.classList.toggle("liked");
    });
});
