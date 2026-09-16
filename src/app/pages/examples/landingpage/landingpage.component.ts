import { Component, OnInit, OnDestroy } from "@angular/core";

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    unit: string;
    imageUrl: string;
    description?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

@Component({
    selector: "app-landingpage",
    templateUrl: "landingpage.component.html",
    styleUrls: ["./landingpage.component.scss"],
})
export class LandingpageComponent implements OnInit, OnDestroy {
    isCollapsed = true;

    // Product Data
    categories: string[] = ["All", "Coffee", "Drinks", "Snacks", "Noodles"];
    activeCategory: string = "All";

    products: Product[] = [
        {
            id: 1,
            name: "Barako Coffee (Philippine Blend)",
            category: "Coffee",
            price: 45.0,
            unit: "Pack",
            imageUrl: "assets/img/coffee.jpg",
            description: "Authentic strong Barako coffee from the Philippines.",
        },
        {
            id: 2,
            name: "Maggi Magic Sarap",
            category: "Noodles",
            price: 15.0,
            unit: "Dozen",
            imageUrl: "assets/img/maggi.jpg",
            description: "All-in-one seasoning granules.",
        },
        {
            id: 3,
            name: "Gatorade Blue Bolt",
            category: "Drinks",
            price: 65.0,
            unit: "Case",
            imageUrl: "assets/img/gatorade.jpg",
            description: "Sports drink, 24x500ml.",
        },
        {
            id: 4,
            name: "Chocolates",
            category: "Chocolates",
            price: 35.0,
            unit: "Case",
            imageUrl: "assets/img/snacks.jpg",
            description: "Spicy flavor, 30 bags.",
        },
        {
            id: 5,
            name: "Nescafé Classic (Philippines)",
            category: "Coffee",
            price: 48.0,
            unit: "Jar",
            imageUrl: "assets/img/coffee.jpg",
            description: "Classic instant coffee.",
        },
        {
            id: 6,
            name: "Lucky Me! Pancit Canton",
            category: "Noodles",
            price: 32.0,
            unit: "Case",
            imageUrl: "assets/img/pancit.jpg",
            description: "Chilimansi flavor, 40 packs.",
        },
    ];

    filteredProducts: Product[] = [];

    constructor() {}

    ngOnInit() {
        var body = document.getElementsByTagName("body")[0];
        body.classList.add("landing-page");
        this.filterProducts("All");
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName("body")[0];
        body.classList.remove("landing-page");
    }

    filterProducts(category: string) {
        this.activeCategory = category;
        if (category === "All") {
            this.filteredProducts = this.products;
        } else {
            this.filteredProducts = this.products.filter(
                (p) => p.category === category,
            );
        }
    }

    orderDirectWhatsApp(product: Product) {
        const qtyStr = window.prompt(
            `How many ${product.unit}s of ${product.name} would you like to order?`,
            "1",
        );
        if (!qtyStr) return; // User cancelled

        const quantity = parseInt(qtyStr, 10);
        if (isNaN(quantity) || quantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        const total = (product.price * quantity).toFixed(2);
        let message = `Hello AL AKLEH! I would like to place a direct order:\\n\\n`;
        message += `Item: ${product.name}\\n`;
        message += `Quantity: ${quantity} x ${product.unit}\\n`;
        message += `Total Estimated Price: ${total} AED\\n\\n`;
        message += `Please let me know the delivery details.`;

        const phoneNumber = "971562401457";
        const encodedMessage = encodeURIComponent(message);
        window.open(
            `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
            "_blank",
        );
    }
}
