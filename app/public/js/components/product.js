
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
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-4 col-md-6 col-sm-6 d-flex';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card w-100 my-2 shadow-2-strong';

    const img = document.createElement('img');
    img.src = product.productImage;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body d-flex flex-column';

    const priceRowDiv = document.createElement('div');
    priceRowDiv.className = 'd-flex flex-row';

    const currentPrice = document.createElement('h5');
    currentPrice.className = 'mb-1 me-1';
    currentPrice.textContent = `${product.productRealPrice}`;

    priceRowDiv.appendChild(currentPrice);
    if (product.productDiscount != null) {
        const originalPrice = document.createElement('span');
        originalPrice.className = 'text-danger';
        originalPrice.innerHTML = `<s>${product.productPrice}</s>`;
        priceRowDiv.appendChild(originalPrice);
        
    }
    
    const description = document.createElement('p');
    description.className = 'card-text';
    description.textContent = `${product.productDescription}`;

    const footerDiv = document.createElement('div');
    footerDiv.className = 'card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto';

    const addToCartBtn = document.createElement('a');
    addToCartBtn.href = '#!';
    addToCartBtn.className = 'btn btn-primary shadow-0 me-1';
    addToCartBtn.textContent = 'Add to cart';

    const favoriteBtn = document.createElement('a');
    favoriteBtn.href = '#!';
    favoriteBtn.className = 'btn btn-light border icon-hover px-2 pt-2';
    favoriteBtn.innerHTML = '<i class="fas fa-heart fa-lg text-secondary px-1"></i>';

    footerDiv.appendChild(addToCartBtn);
    footerDiv.appendChild(favoriteBtn);

    cardBodyDiv.appendChild(priceRowDiv);
    cardBodyDiv.appendChild(description);
    cardBodyDiv.appendChild(footerDiv);

    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);
    return colDiv;
}