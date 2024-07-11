document.addEventListener('DOMContentLoaded', () => {

    const savedCurrency = localStorage.getItem('currency') || 'usd';
    const currencySelector = document.getElementById('currency-selector');
    const themeToggle = document.getElementById('theme-toggle');
    const fontSize = document.getElementById('font-size');
    const currency = document.getElementById('currency');

    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium-font';

    document.body.classList.add(savedTheme);
    document.body.classList.add(savedFontSize);


    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    fontSize.addEventListener('change', () => {
        document.body.classList.remove('small-font', 'medium-font', 'large-font');
        document.body.classList.add(`${fontSize.value}-font`);
        localStorage.setItem('fontSize', `${fontSize.value}-font`);
    });


    const prices = document.querySelectorAll('.price');

    // Load saved currency preference
    currencySelector.value = savedCurrency;
    updatePrices(savedCurrency);

    // Listen for currency changes
    currencySelector.addEventListener('change', (event) => {
        const selectedCurrency = event.target.value;
        localStorage.setItem('currency', selectedCurrency);
        updatePrices(selectedCurrency);
    });

    function updatePrices(currency) {
        prices.forEach(price => {
            const usdPrice = price.getAttribute('data-price-usd');
            const eurPrice = price.getAttribute('data-price-eur');
            if (currency === 'usd') {
                price.textContent = `$${usdPrice}`;
            } else if (currency === 'eur') {
                price.textContent = `€${eurPrice}`;
            }
        });
    }

    // Carousel functionality
    const carouselImages = document.querySelectorAll('.carousel img');
    let currentImageIndex = 0;

    function showNextImage() {
        carouselImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        carouselImages[currentImageIndex].classList.add('active');
    }

    setInterval(showNextImage, 3000);

    // Dynamic product price update based on selection
    const colorSelect = document.getElementById('product-color');
    const sizeSelect = document.getElementById('product-size');
    const priceDisplay = document.getElementById('product-price');

    colorSelect.addEventListener('change', updatePrice);
    sizeSelect.addEventListener('change', updatePrice);

    function updatePrice() {
        const basePrice = 19.99;
        let finalPrice = basePrice;

        if (colorSelect.value === 'red') {
            finalPrice += 2;
        } else if (colorSelect.value === 'blue') {
            finalPrice += 1;
        }

        if (sizeSelect.value === 'large') {
            finalPrice += 3;
        } else if (sizeSelect.value === 'medium') {
            finalPrice += 1;
        }

        priceDisplay.textContent = `$${finalPrice.toFixed(2)}`;
    }

    // Form validation for checkout
    const form = document.getElementById('checkout-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = form.elements['name'].value;
        const address = form.elements['address'].value;
        const email = form.elements['email'].value;
        const telephone = form.elements['telephone'].value;
        const postcode = form.elements['postcode'].value;
        const paymentMethod = form.elements['payment-method'].value;

        if (!name || !address || !email || !telephone || !postcode || !paymentMethod) {
            alert('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        console.log('Form submitted successfully');
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    // Shopping cart functionality
    let cart = [];

    const addToCartButton = document.getElementById('add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    addToCartButton.addEventListener('click', () => {
        const product = {
            name: 'Eco-friendly Water Bottle',
            price: 19.99,
            quantity: 1
        };

        cart.push(product);
        updateCart();
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
});
