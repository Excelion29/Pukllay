async function loadNavbar(container) {
    try {
        const navbarContainer = document.getElementById(container);

        // Crear el contenedor principal
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('p-3', 'text-center', 'bg-white', 'border-bottom');

        // Crear el contenedor secundario
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container');

        // Crear la fila
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

        // Función para crear los enlaces con íconos
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

        // Crear los enlaces con íconos
        iconWrapper.appendChild(createIconLink("/iniciosesion.html", "fa-user-alt", "Sign in"));
        iconWrapper.appendChild(createIconLink("https://github.com/mdbootstrap/bootstrap-material-design", "fa-heart", "Wishlist"));
        iconWrapper.appendChild(createIconLink("https://github.com/mdbootstrap/bootstrap-material-design", "fa-shopping-cart", "My cart"));
        colIconsDiv.appendChild(iconWrapper);

        // Tercera columna (Search bar)
        const colSearchDiv = document.createElement('div');
        colSearchDiv.classList.add('col-lg-5', 'col-md-12', 'col-12');
        const searchWrapper = document.createElement('div');
        searchWrapper.classList.add('input-group', 'float-center');

        // Search input
        const formOutline = document.createElement('div');
        formOutline.classList.add('form-outline');
        const searchInput = document.createElement('input');
        searchInput.type = "search";
        searchInput.id = "form1";
        searchInput.classList.add('form-control');
        const searchLabel = document.createElement('label');
        searchLabel.classList.add('form-label');
        searchLabel.setAttribute('for', 'form1');
        searchLabel.textContent = 'Search';
        formOutline.appendChild(searchInput);
        formOutline.appendChild(searchLabel);

        // Search button
        const searchButton = document.createElement('button');
        searchButton.type = "button";
        searchButton.classList.add('btn', 'btn-danger', 'shadow-0');
        const searchIcon = document.createElement('i');
        searchIcon.classList.add('fas', 'fa-search');
        searchButton.appendChild(searchIcon);

        // Agregar input y botón al contenedor
        searchWrapper.appendChild(formOutline);
        searchWrapper.appendChild(searchButton);
        colSearchDiv.appendChild(searchWrapper);

        // Agregar columnas a la fila
        rowDiv.appendChild(colLogoDiv);
        rowDiv.appendChild(colIconsDiv);
        rowDiv.appendChild(colSearchDiv);

        // Agregar fila al contenedor
        containerDiv.appendChild(rowDiv);

        // Agregar contenedor principal al body
        navbarContainer.appendChild(mainDiv);
        mainDiv.appendChild(containerDiv);

        // Creación de la Navbar
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

        // Colapsable (menú de enlaces)
        const collapseDiv = document.createElement('div');
        collapseDiv.classList.add('collapse', 'navbar-collapse', 'justify-content-center');
        collapseDiv.id = 'navbarLeftAlignExample';

        // Lista de enlaces
        const ul = document.createElement('ul');
        ul.classList.add('navbar-nav', 'mb-2', 'mb-lg-0');

        // Función para crear un enlace de navegación
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

        // Crear y agregar los enlaces a la lista
        ul.appendChild(createNavLink("/app/resource/views/nosotros.html", "Nosotros"));
        ul.appendChild(createNavLink("/app/resource/views/contact.html", "Contacto"));
        ul.appendChild(createNavLink("/app/resource/views/shop.html", "Tienda"));

        // Agregar lista y colapsable al contenedor de la navbar
        collapseDiv.appendChild(ul);
        containerNav.appendChild(toggleButton);
        containerNav.appendChild(collapseDiv);

        // Agregar contenedor de la navbar al elemento nav y finalmente al body
        nav.appendChild(containerNav);
        navbarContainer.appendChild(nav);
    } catch(error){
        console.error('Error loading navbar:', error);
    }
}
