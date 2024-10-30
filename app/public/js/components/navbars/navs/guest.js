async function loadNavbar(container) {
    try {
        const navbarContainer = document.getElementById(container);

        // Contenedor principal
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('p-3', 'text-center', 'bg-white', 'border-bottom');

        // Contenedor secundario
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container');

        // Fila principal
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'gy-3');

        // Primera columna (Logo)
        const colLogoDiv = document.createElement('div');
        colLogoDiv.classList.add('col-lg-2', 'col-sm-4', 'col-4');
        const logoLink = document.createElement('a');
        logoLink.href = "/";
        logoLink.classList.add('float-start');
        const logoImg = document.createElement('img');
        logoImg.src = "/app/public/img/Logo.png";
        logoImg.height = 35;
        logoLink.appendChild(logoImg);
        colLogoDiv.appendChild(logoLink);

        // Segunda columna (Sign in, Wishlist, My cart)
        const colIconsDiv = document.createElement('div');
        colIconsDiv.classList.add('order-lg-last', 'col-lg-5', 'col-sm-8', 'col-8');
        const iconWrapper = document.createElement('div');
        iconWrapper.classList.add('d-flex', 'float-end');

        const createIconLink = (href, iconClass, text) => {
            const link = document.createElement('a');
            link.href = href;
            link.classList.add('me-1', 'border', 'rounded', 'py-1', 'px-3', 'nav-link', 'd-flex', 'align-items-center');
            link.target = "_blank";

            const icon = document.createElement('i');
            icon.classList.add('fas', iconClass, 'm-1', 'me-md-2');
            link.appendChild(icon);

            const p = document.createElement('p');
            p.classList.add('d-none', 'd-md-block', 'mb-0');
            p.textContent = text;
            link.appendChild(p);

            return link;
        };

        iconWrapper.appendChild(createIconLink("/iniciosesion.html", "fa-user-alt", "Iniciar Sesión"));
        colIconsDiv.appendChild(iconWrapper);

        // Tercera columna (Barra de búsqueda)
        const colSearchDiv = document.createElement('div');
        colSearchDiv.classList.add('col-lg-5', 'col-md-12', 'col-12');
        const searchWrapper = document.createElement('div');
        searchWrapper.classList.add('input-group', 'float-center', 'position-relative'); // Para posicionar resultados

        // Input de búsqueda
        const searchInput = document.createElement('input');
        searchInput.type = "search";
        searchInput.id = "searchInput";
        searchInput.classList.add('form-control');
        searchInput.placeholder = "Buscar productos...";

        // Botón de búsqueda
        const searchButton = document.createElement('button');
        searchButton.type = "button";
        searchButton.classList.add('btn', 'btn-danger', 'shadow-0');
        const searchIcon = document.createElement('i');
        searchIcon.classList.add('fas', 'fa-search');
        searchButton.appendChild(searchIcon);

        // Contenedor para los resultados de búsqueda
        const resultsContainer = document.createElement('div');
        resultsContainer.id = "search-results";
        resultsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            max-height: 200px;
            overflow-y: auto;
            background-color: white;
            border: 1px solid #ddd;
            z-index: 1000;
        `;

        // Agregar input, botón y contenedor de resultados al contenedor de búsqueda
        searchWrapper.appendChild(searchInput);
        searchWrapper.appendChild(searchButton);
        searchWrapper.appendChild(resultsContainer);
        colSearchDiv.appendChild(searchWrapper);

        // Agregar columnas a la fila
        rowDiv.appendChild(colLogoDiv);
        rowDiv.appendChild(colIconsDiv);
        rowDiv.appendChild(colSearchDiv);

        // Agregar fila al contenedor
        containerDiv.appendChild(rowDiv);
        mainDiv.appendChild(containerDiv);
        navbarContainer.appendChild(mainDiv);

        // Crear el navbar completo
        const nav = document.createElement('nav');
        nav.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-white');

        const containerNav = document.createElement('div');
        containerNav.classList.add('container', 'justify-content-center', 'justify-content-md-between');

        // Botón de menú
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('navbar-toggler', 'border', 'py-2', 'text-dark');
        toggleButton.type = "button";
        toggleButton.setAttribute('data-mdb-toggle', 'collapse');
        toggleButton.setAttribute('data-mdb-target', '#navbarLeftAlignExample');
        toggleButton.setAttribute('aria-controls', 'navbarLeftAlignExample');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-label', 'Toggle navigation');
        const toggleIcon = document.createElement('i');
        toggleIcon.classList.add('fas', 'fa-bars');
        toggleButton.appendChild(toggleIcon);

        // Menú colapsable
        const collapseDiv = document.createElement('div');
        collapseDiv.classList.add('collapse', 'navbar-collapse', 'justify-content-center');
        collapseDiv.id = 'navbarLeftAlignExample';

        const ul = document.createElement('ul');
        ul.classList.add('navbar-nav', 'mb-2', 'mb-lg-0');

        const createNavLink = (href, text) => {
            const li = document.createElement('li');
            li.classList.add('nav-item', 'mx-3');

            const a = document.createElement('a');
            a.classList.add('nav-link', 'text-dark', 'custom-hover', 'fw-bold', 'fs-5');
            a.href = href;
            a.textContent = text;

            li.appendChild(a);
            return li;
        };

        ul.appendChild(createNavLink("/app/resource/views/nosotros.html", "Nosotros"));
        ul.appendChild(createNavLink("/app/resource/views/contact.html", "Contacto"));
        ul.appendChild(createNavLink("/app/resource/views/shop.html", "Tienda"));

        collapseDiv.appendChild(ul);
        containerNav.appendChild(toggleButton);
        containerNav.appendChild(collapseDiv);
        nav.appendChild(containerNav);
        navbarContainer.appendChild(nav);

        // Evento para búsqueda en tiempo real
        searchInput.addEventListener('input', performSearch);

        // Evento para ocultar resultados al hacer clic fuera del input o del contenedor
        document.addEventListener('click', (event) => {
            if (
                !searchWrapper.contains(event.target) &&
                !resultsContainer.contains(event.target)
            ) {
                resultsContainer.innerHTML = ''; // Vacía el contenedor de resultados
            }
        });

    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Función para realizar la búsqueda
async function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

    try {
        const response = await fetch('/app/models/product_model.json');
        const products = await response.json();

        const results = products.filter(product =>
            product.productDescription.toLowerCase().includes(query)
        );

        displaySearchResults(results, resultsContainer);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Función para mostrar los resultados de búsqueda
function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<p style="padding: 10px;">No se encontraron productos.</p>';
        return;
    }

    results.forEach(product => {
        // Crear un enlace que lleva a /compras/comprar.html pasando el nombre del producto como parámetro
        const productLink = document.createElement('a');
        productLink.href = `/compras/comprar.html?product=${encodeURIComponent(product.productDescription)}`;
        productLink.style.cssText = `
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-decoration: none;
            color: black;
        `;
        productLink.target = "_blank"; // Opcional: Abrir en nueva pestaña

        // Contenido del enlace
        productLink.innerHTML = `
            <img src="${product.productImage}" alt="${product.productDescription}" 
                style="height: 40px; margin-right: 10px; border-radius: 8px;">
            <div>
                <strong>${product.productDescription}</strong><br>
                <span style="color: green; font-weight: bold;">${product.productRealPrice}</span>
            </div>
        `;

        // Agregar el enlace al contenedor de resultados
        container.appendChild(productLink);
    });
}

