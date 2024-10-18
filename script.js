// Inicializa el carrito vacío o con el contenido guardado en localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartSummary() {
    document.getElementById('cart-icon').textContent = `Carrito (${cart.length})`;
}

function mostrarCarrito() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} (Talla: ${item.talla}) - $${item.price}`;
        cartItems.appendChild(li);
    });
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const product = event.target.getAttribute('data-product');
        const price = parseFloat(event.target.getAttribute('data-price'));
        const talla = event.target.parentElement.querySelector('.select-talla').value;
        cart.push({ product, price, talla });
        localStorage.setItem('cart', JSON.stringify(cart));
        mostrarCarrito();
        updateCartSummary();
    });
});

// Función para finalizar la compra
document.getElementById('finalize-purchase').addEventListener('click', (event) => {
    event.preventDefault();
    let message = 'Hola, me gustaría comprar los siguientes productos:%0A';
    cart.forEach(item => {
        message += `- ${item.product} (Talla: ${item.talla}): $${item.price}%0A`;
    });
    window.open(`https://wa.me/921838549?text=${message}`, '_blank');
});

// Vaciar carrito
function vaciarCarrito() {
    cart = [];
    localStorage.removeItem('cart');
    mostrarCarrito();
    updateCartSummary();
    alert('Carrito vaciado.');
}

// Función de búsqueda de productos
document.getElementById('search-bar').addEventListener('input', function() {
    let query = this.value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
        let title = card.querySelector('.card-title').textContent.toLowerCase();
        if (title.includes(query)) {
            card.parentElement.style.display = 'block';
        } else {
            card.parentElement.style.display = 'none';
        }
    });
});

// Redirigir al carrito al hacer clic en el ícono del carrito
document.getElementById('cart-icon').addEventListener('click', function() {
    document.getElementById('cart-section').scrollIntoView({ behavior: 'smooth' });
});

// Mostrar más/menos descripción
document.querySelectorAll('.show-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const description = button.previousElementSibling;
        if (description.classList.contains('expanded')) {
            description.classList.remove('expanded');
            button.textContent = 'Mostrar más';
        } else {
            description.classList.add('expanded');
            button.textContent = 'Mostrar menos';
        }
    });
});

// Navegación de imágenes
document.querySelectorAll('.image-slider').forEach(slider => {
    const images = slider.querySelectorAll('.product-image');
    let currentIndex = 0;

    slider.querySelector('.right-arrow').addEventListener('click', () => {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % images.length; // Cambia al siguiente índice
        images[currentIndex].style.display = 'block';
    });

    slider.querySelector('.left-arrow').addEventListener('click', () => {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Cambia al índice anterior
        images[currentIndex].style.display = 'block';
    });
});

// Inicializa el resumen del carrito al cargar la página
updateCartSummary();
mostrarCarrito();
