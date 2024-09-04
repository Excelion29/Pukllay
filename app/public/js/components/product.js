
async function loadProduct(idcontent) {
    try {
        const response = await fetch('/app/models/product_model.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const container = document.getElementById(idcontent);

        data.forEach(product => {
            const card = createProductCard(product);
            container.appendChild(card);
        });

    } catch(error){
        console.error('Error loading product:', error);
    }
}

function createProductCard(product) {
    const article = document.createElement('article');
    article.classList.add('col-lg-3', 'col-md-6', 'col-sm-6', 'd-flex', 'product-design');
    
    const card = document.createElement('div');
    card.classList.add('card', 'w-100', 'my-2', 'shadow-2-strong');

    // Crear la imagen
    const img = document.createElement('img');
    img.src = product.productImage;
    img.classList.add('card-img-top');
    img.style.aspectRatio = '1 / 1';

    // Crear el cuerpo de la tarjeta
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-flex', 'flex-column');

    // Crear la línea de separación
    const hr = document.createElement('hr');

    // Crear el título
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'text-black');
    cardTitle.textContent = product.productDescription;

    // Crear el precio
    const cardText = document.createElement('p');
    cardText.classList.add('card-text', 'h5', 'mt-2');
    cardText.textContent = `${product.productRealPrice}`;

    // Crear el pie de la tarjeta
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer', 'd-flex', 'pt-2', 'px-0', 'pb-0', 'mt-auto');

    // Crear el botón "Agregar al carro"
    const addToCartButton = document.createElement('a');
    addToCartButton.href = '#!';
    addToCartButton.classList.add('btn', 'btn-success', 'shadow-0', 'me-1', 'p-2', 'text-white', 'align-content-center');
    addToCartButton.style.width = '60%';
    addToCartButton.innerHTML = '<i class="fa-solid fa-cart-shopping"></i><br><span>Agregar al carro</span>';

    // priceRowDiv.appendChild(currentPrice);
    // if (product.productDiscount != null) {
    //     const originalPrice = document.createElement('span');
    //     originalPrice.className = 'text-danger';
    //     originalPrice.innerHTML = `<s>${product.productPrice}</s>`;
    //     priceRowDiv.appendChild(originalPrice);
        
    // }
    
    // Crear el botón "Comprar"
    const buyButton = document.createElement('a');
    buyButton.href = '#!';
    buyButton.classList.add('btn', 'btn-success', 'shadow-0', 'me-1', 'p-2', 'text-white', 'align-content-center');
    buyButton.style.width = '40%';
    buyButton.innerHTML = '<i class="fa-solid fa-credit-card"></i><br><span>Comprar</span>';

    // Añadir los botones al pie de la tarjeta
    cardFooter.appendChild(addToCartButton);
    cardFooter.appendChild(buyButton);

    // Añadir elementos al cuerpo de la tarjeta
    cardBody.appendChild(hr);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardFooter);

    // Añadir la imagen y el cuerpo a la tarjeta
    card.appendChild(img);
    card.appendChild(cardBody);

    // Añadir la tarjeta al artículo
    article.appendChild(card);
    return article;
}